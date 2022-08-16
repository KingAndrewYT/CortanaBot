const getAdmins = async (participants) => {
        const admins = []
        for (let i of participants){
            i.admin ? admins.push(i.id) : ''
        }
        return admins
        
    }

module.exports = getAdmins