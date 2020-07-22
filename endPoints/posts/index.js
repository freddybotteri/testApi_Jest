module.exports = ({axios}) => ({

	get: async(req,res)=> {
		const { data } = axios.get('')
		res.status(200).send(data)
	},
	post : async(req,res)=> {
		const {data:users} = await axios.get("https://jsonplaceholder.typicode.com/users")
		const found = users.find(x => x.id === req.body.userId)
		if(found){
			const { data } = await axios.post("https://jsonplaceholder.typicode.com/posts",req.body)
			return res.status(201).send(data)
		}
		res.sendStatus(500)
	},
	put: async(req,res)=> {
		const {data} = await axios.put(`https://jsonplaceholder.typicode.com/posts/${req.body.userId}`)
		if(data){
			return res.status(200).send(data)
		}
		res.sendStatus(409)

	},
	delete: async(res,req)=> {

	}
})
