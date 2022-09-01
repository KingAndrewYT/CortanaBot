const getParticipants = (participants) => {
    const admins = []
    participants.map(i => {
        !i.admin ? admins.push(i.id) : ''
    })
    return  admins
}

module.exports = getParticipants