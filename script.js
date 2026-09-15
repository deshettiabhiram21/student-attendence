function addStudent() {

    let name = document.getElementById("name").value.trim();
    let rollNo = document.getElementById("rollNo").value.trim();

    if (name === "" || rollNo === "") {
        alert("Please enter all details");
        return;
    }

    let students =
        JSON.parse(localStorage.getItem("students")) || [];

    // Check duplicate roll number

    let existingStudent = students.find(function(student) {

        return student.rollNo.toLowerCase() === rollNo.toLowerCase();

    });

    if (existingStudent) {

        alert("Student with this Roll Number already exists!");

        return;
    }

    let student = {
        name: name,
        rollNo: rollNo
    };

    students.push(student);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    alert("Student added successfully");

    document.getElementById("name").value = "";
    document.getElementById("rollNo").value = "";
}


// ===============================
// MARK ATTENDANCE
// ===============================

function loadStudents() {

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let studentList = document.getElementById("studentList");

    if (!studentList) {
        return;
    }

    studentList.innerHTML = "";

    students.forEach(function(student, index) {

        let row = `
            <tr>
                <td>${student.rollNo}</td>
                <td>${student.name}</td>

                <td>
                    <input type="radio"
                           name="attendance${index}"
                           value="Present">
                    Present

                    <input type="radio"
                           name="attendance${index}"
                           value="Absent">
                    Absent
                </td>
            </tr>
        `;

        studentList.innerHTML += row;
    });
}


function saveAttendance() {

    let date = document.getElementById("attendanceDate").value;

    if (date === "") {
        alert("Please select a date");
        return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let attendance =
        JSON.parse(localStorage.getItem("attendance")) || [];

    students.forEach(function(student, index) {

        let selected = document.querySelector(
            `input[name="attendance${index}"]:checked`
        );

        if (selected) {

            attendance.push({
                date: date,
                rollNo: student.rollNo,
                name: student.name,
                status: selected.value
            });

        }

    });

    localStorage.setItem(
        "attendance",
        JSON.stringify(attendance)
    );

    alert("Attendance saved successfully");
}


// ===============================
// ATTENDANCE REPORT
// ===============================

function loadReport() {

    let attendance =
        JSON.parse(localStorage.getItem("attendance")) || [];

    let reportList = document.getElementById("reportList");

    if (!reportList) {
        return;
    }

    reportList.innerHTML = "";

    let students =
        JSON.parse(localStorage.getItem("students")) || [];

    students.forEach(function(student) {

        let totalDays = 0;
        let presentDays = 0;

        attendance.forEach(function(record) {

            if (record.rollNo === student.rollNo) {

                totalDays++;

                if (record.status === "Present") {
                    presentDays++;
                }

            }

        });

        let percentage = 0;

        if (totalDays > 0) {
            percentage = (presentDays / totalDays) * 100;
        }

        let row = `
            <tr>
                <td>${student.rollNo}</td>
                <td>${student.name}</td>
                <td>${presentDays}</td>
                <td>${totalDays}</td>
                <td>${percentage.toFixed(2)}%</td>
            </tr>
        `;

        reportList.innerHTML += row;

    });
}


// ===============================
// VIEW STUDENTS
// ===============================

function loadStudentTable() {

    let students =
        JSON.parse(localStorage.getItem("students")) || [];

    let studentTable =
        document.getElementById("studentTable");

    if (!studentTable) {
        return;
    }

    studentTable.innerHTML = "";

    students.forEach(function(student, index) {

        let row = `
            <tr>
                <td>${student.rollNo}</td>
                <td>${student.name}</td>
                <td>
                    <button onclick="deleteStudent(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;

        studentTable.innerHTML += row;
    });
}


function deleteStudent(index) {

    let students =
        JSON.parse(localStorage.getItem("students")) || [];

    students.splice(index, 1);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    loadStudentTable();

    alert("Student deleted successfully");
}


// ===============================
// SEARCH STUDENT
// ===============================

function searchStudent() {

    let search =
        document.getElementById("search").value.toLowerCase();

    let students =
        JSON.parse(localStorage.getItem("students")) || [];

    let studentTable =
        document.getElementById("studentTable");

    if (!studentTable) {
        return;
    }

    studentTable.innerHTML = "";

    students.forEach(function(student, index) {

        if (
            student.name.toLowerCase().includes(search) ||
            student.rollNo.toLowerCase().includes(search)
        ) {

            let row = `
                <tr>
                    <td>${student.rollNo}</td>
                    <td>${student.name}</td>
                    <td>
                        <button onclick="deleteStudent(${index})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;

            studentTable.innerHTML += row;
        }
    });
}


// ===============================
// LOAD REQUIRED PAGE DATA
// ===============================

loadStudents();
loadReport();
loadStudentTable();

function loadDashboard() {

    let students =
        JSON.parse(localStorage.getItem("students")) || [];

    let attendance =
        JSON.parse(localStorage.getItem("attendance")) || [];

    let totalStudents =
        document.getElementById("totalStudents");

    if (!totalStudents) {
        return;
    }

    totalStudents.innerText = students.length;


    // Today's date

    let today = new Date().toISOString().split("T")[0];


    // Find today's attendance

    let todayAttendance = attendance.filter(function(record) {

        return record.date === today;

    });


    let presentToday = 0;
    let absentToday = 0;


    todayAttendance.forEach(function(record) {

        if (record.status === "Present") {
            presentToday++;
        }

        if (record.status === "Absent") {
            absentToday++;
        }

    });


    document.getElementById("presentToday").innerText =
        presentToday;

    document.getElementById("absentToday").innerText =
        absentToday;


    // Calculate average attendance

    let totalAttendance = 0;
    let totalPresent = 0;


    attendance.forEach(function(record) {

        totalAttendance++;

        if (record.status === "Present") {
            totalPresent++;
        }

    });


    let average = 0;

    if (totalAttendance > 0) {

        average =
            (totalPresent / totalAttendance) * 100;

    }


    document.getElementById("averageAttendance").innerText =
        average.toFixed(2) + "%";
}


loadDashboard();