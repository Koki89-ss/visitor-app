
const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


const config = {
  server: "DESKTOP-JALOKH3",
  database: "VisitorsManagementSystem",
  user: "visitor_user",
  password: "Password123!",
  options: {
    encrypt: false, 
    trustedServerCertificate: true,
  }
};

const poolPromise = sql.connect(config)
  .then(() => console.log("Connected to SQL Server"))
  .catch(err => console.error("SQL Connection Error:", err));
//Endpoint to receive visitor form data

app.post("/api/visitors", async (req, res) => {
  const { visitorCategory, purpose, hostEmployeeId, locationId, visitors, checkInTime, checkOutTime } = req.body;

  if (!visitorCategory || !purpose || !hostEmployeeId || !locationId || !visitors?.length === 0)  {
    return res.status(400).json({ 
	success: false, 
	message: "Missing required fields" });
  }

 let transaction;

  try {
   const pool = await  poolPromise;

    transaction = new sql.Transaction(pool);
    await transaction.begin();


    const meetingRequest = new sql.Request(transaction);

    const meetingResult = await meetingRequest

      .input("visitorCategory", sql.NVarChar, visitorCategory)
      .input("purpose", sql.NVarChar, purpose)
      .input("hostEmployeeId", sql.Int, Number(hostEmployeeId))
      .input("checkInTime", sql.DateTime, checkInTime ? new Date(checkInTime) : null)
      .input("checkOutTime", sql.DateTime, checkOutTime ? new Date(checkOutTime) : null)
      .input("locationId", sql.Int, Number(locationId))
      .input("status",sql.NVarChar,"Pending")
      .input("createdDate",sql.DateTime,new Date())
      .query(`
        INSERT INTO Meetings (VisitorCategory, Purpose, CheckInTime, CheckOutTime, HostEmployeeID, LocationID, Status, CreatedDate)
        OUTPUT INSERTED.MeetingID
        VALUES (@visitorCategory, @purpose, @checkInTime, @checkOutTime, @hostEmployeeId, @locationId, @status, @createdDate)
      `);
 
   const meetingID = meetingResult.recordset[0].MeetingID;

 

    for (const visitor of visitors) {
        if (!visitor.fullName || !visitor.contactNum  || !visitor.email || !visitor.organizationName) {
          throw new Error("Each visitor must have all required fields filled");
        }

     const visitorRequest = new sql.Request(transaction);
     await visitorRequest
        .input("fullName", sql.NVarChar, visitor.fullName)
        .input("email", sql.NVarChar, visitor.email)
        .input("organizationName", sql.NVarChar, visitor.organizationName)
        .input("vehicleNum", sql.NVarChar, visitor.vehicleNum || null)
        .input("contactNum", sql.NVarChar, visitor.contactNum || null) 
        .input("meetingID", sql.Int, meetingID)  
        .input("createdDate",sql.DateTime, new Date())

        .query(`
          INSERT INTO Visitors
          (FullName, Email, OrganizationName, VehicleNum, ContactNum, MeetingID, CreatedDate)
          VALUES
          (@fullName, @email, @organizationName, @vehicleNum, @contactNum, @meetingID, @createdDate)
        `);
    }

  await transaction.commit();

  return res.json({ success: true, message: "Visitor saved successfully", meetingId: meetingID });

 } catch (err) {
   console.error("Error:", err);

  if (transaction) {
    try {
      await transaction.rollback();
    } catch (rollbackErr) {
      console.error("Rollback failed:", rollbackErr);
    }
  }
  return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Start backend server
app.listen(5000, "0.0.0.0", () => console.log("Server running on http://0.0.0.0:5000"));