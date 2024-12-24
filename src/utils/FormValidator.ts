
export const EmailValidator = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const PasswordValidator = (password: string) => {
    return password.length >= 8;
}

export const UsernameValidator = (username: string) => {
    return username.length >= 4;
}

export const NicknameValidator = (nickname: string) => {
    return nickname.length >= 4;
}