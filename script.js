function addStudent() {

    let name = document.getElementById("name").value;
    let rollNo = document.getElementById("rollNo").value;

    if (name === "" || rollNo === "") {
        alert("Please enter all details");
        return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let student = {
        name: name,
        rollNo: rollNo
    };

    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    alert("Student added successfully");

    document.getElementById("name").value = "";
    document.getElementById("rollNo").value = "";
}


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
                    <input type="radio" name="attendance${index}" value="Present">
                    Present

                    <input type="radio" name="attendance${index}" value="Absent">
                    Absent
                </td>
            </tr>
        `;

        studentList.innerHTML += row;
    });
}


function saveAttendance() {

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let attendance = [];

    students.forEach(function(student, index) {

        let selected = document.querySelector(
            `input[name="attendance${index}"]:checked`
        );

        if (selected) {

            attendance.push({
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


loadStudents();

function loadReport() {

    let attendance =
        JSON.parse(localStorage.getItem("attendance")) || [];

    let reportList = document.getElementById("reportList");

    if (!reportList) {
        return;
    }

    reportList.innerHTML = "";

    attendance.forEach(function(student) {

        let row = `
            <tr>
                <td>${student.rollNo}</td>
                <td>${student.name}</td>
                <td>${student.status}</td>
            </tr>
        `;

        reportList.innerHTML += row;
    });
}

loadReport();