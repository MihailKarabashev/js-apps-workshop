window.addEventListener('load', async () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', onCreate);
});

async function onCreate(event) {
    event.preventDefault();

    const url = 'http://localhost:3030/data/recipes';

    const form = event.target;
    const formData = new FormData(form);

    const name = formData.get('name').trim();
    const img = formData.get('img').trim();
    const ingredients = formData.get('ingredients').trim().split('\n');
    const steps = formData.get('steps').trim().split('\n');

    const recipe = {
        name,
        img,
        ingredients,
        steps
    }

    let token = localStorage.getItem('token');
    if (token == null) {
        window.location = '/login.html';
        return;
    }

    try {
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(recipe)
        });

        if (res.ok == false) {
            const error = await res.json();
            throw new Error(error.message);
        }

        await res.json();

        window.location = '/index.html';
    } catch (error) {
        alert(error.message);
    }
}