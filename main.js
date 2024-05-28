document.addEventListener('DOMContentLoaded', () => {

    // Elemento <ul> dove verranno visualizzate le email generate
    const emailList = document.getElementById('email-list');

    // Funzione per generare le email
    const generateEmails = async () => {

        const emailPromises = [];

        // Array per memorizzare le email generate
        const emails = [];

        // Ciclo per generare 10 email
        for (let i = 0; i < 10; i++) {

            const emailPromise = axios.get('https://flynn.boolean.careers/exercises/api/random/mail')
            .then(response => {

                // Se la richiesta ha successo aggiungiamo l'email all'array
                const email = response.data.response;
                emails.push(email);
                console.log(email);
            })
            .catch(error => {

                // Se si verifica un errore nella richiesta
                console.error('Errore nel recupero delle email:', error);
            });
            emailPromises.push(emailPromise);
        }
        try {  
            await Promise.all(emailPromises);
            emails.forEach(email => {
                const listItem = document.createElement('li');
                listItem.textContent = email;
                emailList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Errore nel recupero delle email:', error);
        }
    };
    generateEmails();
});
