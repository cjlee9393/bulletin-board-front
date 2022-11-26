const baseUrl = 'http://localhost:3000/';

export async function getData(endpoint, auth_token) {
    const response = await fetch(baseUrl + endpoint, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${auth_token}`,
        }
    });

    try{
        const data = await response.json();
        return data;
    }catch(error){
        alert(error);
        console.log(`error: ${error}`);
    }
}

export async function postData(endpoint, auth_token, data = {}){
    try{
        const response = await fetch(baseUrl + endpoint, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth_token}`,
            },
            body: JSON.stringify(data)
        })
    }catch(error){
        alert(error);
        console.log('error: ', error);
    }
}

export async function patchData(endpoint, auth_token, data = {}){
    try{
        const response = await fetch(baseUrl + endpoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth_token}`,
            },
            body: JSON.stringify(data)
        })
    }catch(error){
        alert(error);
        console.log('error: ', error);
    }
}

export async function deleteData(endpoint, auth_token){
    try{
        const response = await fetch(baseUrl + endpoint, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${auth_token}`,
            },
        })
    }catch(error){
        alert(error);
        console.log('error: ', error);
    }
}