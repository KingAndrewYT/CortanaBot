const getGroupAdmins = (participants) => {
    const admins = []
    for (let i of participants){
        i.admin ? admins.push(i.id) : ''
    }
    log(admins)
    return admins
}

module.exports = getGroupAdmins