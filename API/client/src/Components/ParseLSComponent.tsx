const parseLocalStorage = async () => {
    let parseUserId: number = parseInt(localStorage.getItem("user_id") as string);
    return parseUserId;
}

  export default parseLocalStorage;