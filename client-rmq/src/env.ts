interface ENV {
    [key: string]: string | undefined;
}

const env:ENV= {
    apiUrl: process.env.REACT_APP_API_URL,
}

export default env;
