import Todo from "../models/Todo.js"
import { deleteTodoImage } from "../helpers/deleteTodoImage.js"


const deleteTodo = async (req, res) => {
    const { id } = req.params
    const todo = await Todo.findById(id)
    if (todo?.userId === req.user.userId) {
        await deleteTodoImage(todo.todoImage)
        await Todo.findByIdAndDelete(id)
        return res.status(200).send({
            message: 'TODO IS DELETED'
        })

    } else {
        return res.status(400).send({
            message: 'USER VALIDATION FAILED'
        })
    }
}

export { deleteTodo }