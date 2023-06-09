require('../src/db/mongoose')
const Task = require('../src/models/task')

const deleteTaskAndCount = async (id) => {
    const result = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments( {completed: false })
    return count
}

deleteTaskAndCount('640c31f84a532713b3ba1b2f').then( (count) => {
    console.log(count)
}).catch( (e) => {
    console.log(e)
})