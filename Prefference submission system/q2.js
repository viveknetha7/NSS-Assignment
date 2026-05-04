const form = document.getElementById('preferenceForm');
const submissionBody = document.getElementById('submissionBody');

// 1. Page load avvagane Storage nundi data techuko
window.onload = () => {
    // LocalStorage nundi data tisko, emi lekapothe empty array [] tisko
    const savedData = JSON.parse(localStorage.getItem('nssSubmissions')) || []; 
    console.log("Loading saved data:", savedData);
    renderTable(savedData); 
};

// 2. Handle Form Submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Form nundi values tisko (Indaka idi miss ayindi!)
    const newSubmission = {
        name: document.getElementById('fullName').value,
        roll: document.getElementById('rollNumber').value,
        pref1: document.getElementById('pref1').value,
        pref2: document.getElementById('pref2').value,
        pref3: document.getElementById('pref3').value
    };

    // 1. Patha data ni Storage nundi tisko
    const currentData = JSON.parse(localStorage.getItem('nssSubmissions')) || [];
    
    // 2. Kotha data ni add chey
    currentData.push(newSubmission);
    
    // 3. Mottam list ni malli save chey (Stringify cheyadam marchipoku)[cite: 1]
    localStorage.setItem('nssSubmissions', JSON.stringify(currentData)); 
    
    // 4. UI ni update chey
    renderTable(currentData);
    
    // Form clear chesi success message ivvu
    form.reset();
    alert('Preferences saved locally! Try refreshing now.');
});

// 3. Helper to update Table
function renderTable(data) {
    // Table body ni clear chey, lekapothe duplicate entries vasthayi
    submissionBody.innerHTML = ""; 
    
    // Prathi item ni table lo add chey
    data.forEach(item => {
        const row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.roll}</td>
                <td>${item.pref1}</td>
                <td>${item.pref2}</td>
                <td>${item.pref3}</td>
            </tr>
        `;
        submissionBody.innerHTML += row;
    });
}