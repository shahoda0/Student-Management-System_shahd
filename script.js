

class Student {
    constructor(id, name, grades, attendance) {
        this.id = id;
        this.name = name;
        this.grades = grades;
        this.attendance = attendance;
    }

    getAverage() {
        let total = this.grades.reduce((sum, grade) => sum + grade, 0);
        return total / this.grades.length;
    }

    getGrade(average) {
        if (average >= 90) return "A";
        else if (average >= 80) return "B";
        else if (average >= 70) return "C";
        else if (average >= 60) return "D";
        else if (average >= 50) return "E";
        else return "F";
    }

    getResult(average) {
        if (average >= 50 && this.attendance >= 75) {
            return "Passed";
        } else {
            return "Needs Review";
        }
    }
}

let studentsList = [
    new Student(101, "Ahmed", [80, 90, 70], 90),
    new Student(102, "Shahd", [45, 40, 48], 80),
    new Student(103, "Aser", [90, 85, 95], 95),
    new Student(104, "Salma", [42, 45, 48], 70)
];

function displayStudents() {
    const table = document.getElementById("studentsTable");

    table.innerHTML = "";

    studentsList.forEach(student => {
        let average = student.getAverage();

        table.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.grades[0]}</td>
                <td>${student.grades[1]}</td>
                <td>${student.grades[2]}</td>
                <td>${average.toFixed(2)}</td>
                <td>${student.getGrade(average)}</td>
            </tr>
        `;
    });

    updateStatistics();
    displayReports();
}

function updateStatistics() {
    let total = studentsList.length;

    let average = total > 0
        ? studentsList.reduce((sum, student) => sum + student.getAverage(), 0) / total
        : 0;

    let successful = studentsList.filter(student =>
        student.getResult(student.getAverage()) === "Passed"
    ).length;

    document.getElementById("totalStudents").textContent = total;
    document.getElementById("averageGrade").textContent = average.toFixed(2);
    document.getElementById("successfulStudents").textContent = successful;
}

function displayReports() {
    let strugglingStudents = studentsList.filter(student => {
        let average = student.getAverage();
        return average >= 40 && average <= 49;
    });

    let studentsAfterGrace = strugglingStudents.map(student => {
        return {
            name: student.name,
            newAverage: student.getAverage() + 5
        };
    });

    let totalAfterGrace = studentsAfterGrace.reduce((sum, student) => {
        return sum + student.newAverage;
    }, 0);

    let graceAverage = studentsAfterGrace.length > 0
        ? totalAfterGrace / studentsAfterGrace.length
        : 0;

    let reports = document.getElementById("reports");

    reports.innerHTML = `
        <h3>Students Eligible for Grace Marks</h3>
        <p>Number of students: ${strugglingStudents.length}</p>

        ${studentsAfterGrace.map(student => `
            <p>${student.name} - New Average: ${student.newAverage.toFixed(2)}</p>
        `).join("")}

        <br>
        <h3>Grace Students Average</h3>
        <p>${graceAverage.toFixed(2)}</p>
    `;
}

document.getElementById("addStudentBtn").addEventListener("click", function() {
    let id = Number(document.getElementById("studentId").value);
    let name = document.getElementById("studentName").value.trim();

    let grade1 = Number(document.getElementById("grade1").value);
    let grade2 = Number(document.getElementById("grade2").value);
    let grade3 = Number(document.getElementById("grade3").value);

    if (!id || !name ||
        document.getElementById("grade1").value === "" ||
        document.getElementById("grade2").value === "" ||
        document.getElementById("grade3").value === "" ||
        !Number.isInteger(id) ||
        studentsList.some(student => student.id === id) ||
        [grade1, grade2, grade3].some(grade =>
            !Number.isFinite(grade) || grade < 0 || grade > 100
        )) {
        alert("Please enter valid student data. Grades must be between 0 and 100.");
        return;
    }

    let newStudent = new Student(
        id,
        name,
        [grade1, grade2, grade3],
        100
    );

    studentsList.push(newStudent);

    displayStudents();

    document.getElementById("studentName").value = "";
    document.getElementById("studentId").value = "";
    document.getElementById("grade1").value = "";
    document.getElementById("grade2").value = "";
    document.getElementById("grade3").value = "";
});

displayStudents();
