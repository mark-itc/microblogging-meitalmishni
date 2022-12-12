export async function getFromServer() {
    try {
        const response = await fetch("https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet");

        if (!response.ok) {
            throw Error("Oops..something went wrong");
        }

        const results = await response.json();
        return { success: true, data: results }

    } catch (error) {
        return { success: false, data: error }
    }
}

export async function addTweetToServer(tweet) {
    try {
        const response = await fetch('https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet', {
            method: 'POST',
            body: JSON.stringify(tweet),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (!response.ok) {
            throw new Error("Can't add new tweet to server");
        }

        return { success: true, message: "Added tweet" }

    } catch (error) {
        return { success: false, message: error }
    }
}