///***FUNCTION


function getFullName(userEntity: { firstname: string, lastname: string }): string {
    return `${userEntity.firstname} ${userEntity.lastname}`
}
const getFullNameArrow = (userEntity: { firstname: string, lastname: string }): string => {
    return `${userEntity.firstname} ${userEntity.lastname}`
}


///***OBJECT

const user = {
    firstname: 'Oleg',
    lastname: 'Pupkin',
    city: 'Minsk',
    age: 23,
    skills: {
        dev: true,
        devops: true
    }
}

// console.log(getFullName(user));

//*****ARRAY

const skills: string[] = ['dev', 'devOps', 'testing']

// for (const skill of skills) {
//     console.log(skill.toLowerCase());
// }

// console.log(skills
//     .filter((s: string) => s !== 'devOps')
//     .map(s => s + '! ')
//     .reduce((a, b) => a + b)
// )



//*****TUPLES
const skill: [number, string] = [1, 'dev']

// const id = skill[0]
// const skillName = skill[1]

const [id, skillName] = skill

const arr: [number, string, ...boolean[]] = [1, 'ewwvwvw', true, true, false]

///******READONLY

const skilla: readonly [number, string] = [1, 'dev']

const skillas: readonly string[] = ['devOps', 'dev']

const skils: ReadonlyArray<string> = ['devOps', 'dev']

// skilla[0] = 2
// skillas[0] = 'cwwv cwjhb'
// skils[0] = 'cwwv cwjhb'
// skils.push('cwwv cwjhb')

///******ENUM
enum StatusCode {
    SUCCESS = 1,
    IN_PROGRESS = 'q',
    REJECT = 'd'
}

const res = {
    message: 'payment successful',
    statusCode: StatusCode.IN_PROGRESS
}

//1-succes
//q-in progress
//d-reject

const enum Roles {
    ADMIN = 1,
    USER = 2
}

const res2 = Roles.ADMIN
