const token =
localStorage.getItem("token");

if (!token) {

    window.location.href =
    "login.html";
}

async function loadStats() {

    const response =
    await fetch(
        "http://localhost:5000/api/admin/stats",
        {
            headers: {
                Authorization:
                `Bearer ${token}`
            }
        }
    );

    const data =
    await response.json();

    document.getElementById(
        "totalCount"
    ).innerText =
    data.stats.total;

    document.getElementById(
        "pendingCount"
    ).innerText =
    data.stats.pending;

    document.getElementById(
        "approvedCount"
    ).innerText =
    data.stats.approved;

    document.getElementById(
        "rejectedCount"
    ).innerText =
    data.stats.rejected;
}

async function loadVolunteers() {

    const response =
    await fetch(
        "http://localhost:5000/api/admin/volunteers",
        {
            headers: {
                Authorization:
                `Bearer ${token}`
            }
        }
    );

    const data =
    await response.json();

    const table =
    document.getElementById(
        "volunteerTable"
    );

    table.innerHTML = "";

    data.volunteers.forEach(
        volunteer => {

            table.innerHTML += `

            <tr>

                <td>${volunteer.full_name}</td>

                <td>${volunteer.email}</td>

                <td>${volunteer.phone}</td>

                <td>${volunteer.skills}</td>

                <td>${volunteer.status}</td>

                <td>

                    <button
                    onclick="approveVolunteer(${volunteer.id})">

                    Approve

                    </button>

                    <button
                    onclick="rejectVolunteer(${volunteer.id})">

                    Reject

                    </button>

                    <button
                    onclick="deleteVolunteer(${volunteer.id})">

                    Delete

                    </button>

                </td>

            </tr>
            `;
        }
    );
}

async function approveVolunteer(id) {

    await fetch(
        `http://localhost:5000/api/admin/approve/${id}`,
        {
            method:"PUT",

            headers:{
                Authorization:
                `Bearer ${token}`
            }
        }
    );

    loadStats();
    loadVolunteers();
}

async function rejectVolunteer(id) {

    await fetch(
        `http://localhost:5000/api/admin/reject/${id}`,
        {
            method:"PUT",

            headers:{
                Authorization:
                `Bearer ${token}`
            }
        }
    );

    loadStats();
    loadVolunteers();
}

async function deleteVolunteer(id) {

    await fetch(
        `http://localhost:5000/api/admin/delete/${id}`,
        {
            method:"DELETE",

            headers:{
                Authorization:
                `Bearer ${token}`
            }
        }
    );

    loadStats();
    loadVolunteers();
}

function logout() {

    localStorage.removeItem(
        "token"
    );

    localStorage.removeItem(
        "user"
    );

    window.location.href =
    "login.html";
}

function searchVolunteer() {

    const input =
    document.getElementById("searchInput").value.toLowerCase();

    const rows =
    document.querySelectorAll("#volunteerTable tr");

    rows.forEach(row => {

        const name =
        row.children[0].innerText.toLowerCase();

        const email =
        row.children[1].innerText.toLowerCase();

        if (
            name.includes(input) ||
            email.includes(input)
        ) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

loadStats();
loadVolunteers();