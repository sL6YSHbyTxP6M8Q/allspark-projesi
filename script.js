const apiUrl = 'https://allspark-projesi-git-main-vercell-s-projects.vercel.app';

async function getSistemDurumu() {
    try {
        const response = await fetch(`${apiUrl}/acil_durum/durum`);
        const data = await response.json();
        document.getElementById('api-output').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('API isteği sırasında bir hata oluştu:', error);
        document.getElementById('api-output').textContent = 'API ile bağlantı kurulamadı.';
    }
}

async function gonderAiMesaj() {
    const inputElement = document.getElementById('ai-mesaj-input');
    const outputElement = document.getElementById('ai-yanit-output');
    const mesaj = inputElement.value;
    if (!mesaj) {
        outputElement.textContent = 'Lütfen bir mesaj yazın.';
        return;
    }
    outputElement.textContent = 'Cevap bekleniyor...';
    try {
        const response = await fetch(`${apiUrl}/allspark_ai/yanit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mesaj: mesaj })
        });
        const data = await response.json();
        outputElement.textContent = `Yapay Zeka Yanıtı: ${data.yanıt}`;
        inputElement.value = '';
    } catch (error) {
        console.error('AI isteği sırasında bir hata oluştu:', error);
        outputElement.textContent = 'API ile iletişimde hata.';
    }
}

document.getElementById('sistem-durumu-guncelle-btn').addEventListener('click', getSistemDurumu);
document.getElementById('ai-gonder-btn').addEventListener('click', gonderAiMesaj);

getSistemDurumu();