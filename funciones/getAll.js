const getAll = (participants) => {
    const members = []
    participants.map(i => {
        members.push(i.id)
    })
    return members
}

module.exports = getAll