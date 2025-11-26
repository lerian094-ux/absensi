let classes = JSON.parse(localStorage.getItem("classData") || "[]");
let selectedClassId = null;

function save() {
  localStorage.setItem("classData", JSON.stringify(classes));
  renderClassList();
  renderClassDetail();
}

function createClass() {
  const name = prompt("Nama kelas:");
  if (!name) return;

  const classObj = {
    id: Date.now(),
    name,
    code: Math.random().toString(36).substr(2, 6).toUpperCase(),
    records: [],
  };

  classes.push(classObj);
  selectedClassId = classObj.id;
  save();
}

function renderClassList() {
  const list = document.getElementById("classList");
  list.innerHTML = "";

  classes.forEach((c) => {
    const li = document.createElement("li");
    li.className = "list-item";
    li.textContent = `${c.name} (Kode: ${c.code})`;
    li.onclick = () => {
      selectedClassId = c.id;
      renderClassDetail();
    };
    list.appendChild(li);
  });
}

function renderClassDetail() {
  const detail = document.getElementById("classDetail");
  const cls = classes.find((c) => c.id === selectedClassId);

  if (!cls) {
    detail.innerHTML = "Pilih kelas untuk melihat absensi.";
    return;
  }

  let html = `
    <h3>${cls.name}</h3>
    <p><b>Kode Kelas:</b> ${cls.code}</p>
    <p><b>Total Hadir:</b> ${cls.records.length}</p>

    <ul style="margin-top:10px;">
  `;

  cls.records.forEach((r, i) => {
    html += `
      <li class="list-item">
        ${i + 1}. ${r.name} — ${new Date(r.time).toLocaleString()}
      </li>
    `;
  });

  html += `</ul>`;

  detail.innerHTML = html;
}

function checkIn() {
  const name = document.getElementById("studentName").value.trim();
  const code = document.getElementById("classCode").value.trim().toUpperCase();

  if (!name || !code) {
    alert("Isi nama dan kode kelas!");
    return;
  }

  const cls = classes.find((c) => c.code === code);
  if (!cls) return alert("Kode kelas tidak ditemukan!");

  cls.records.push({
    name,
    time: new Date().toISOString(),
  });

  document.getElementById("studentName").value = "";
  document.getElementById("classCode").value = "";

  selectedClassId = cls.id;
  save();

  alert("Check-in berhasil!");
}

renderClassList();
renderClassDetail();
