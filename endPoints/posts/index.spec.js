
const postHandler = require('./index')
describe('Endpoint',() => {
	describe('posts',()=>{
		it('should create',async() => {
			const post = {
					"userId": 1,
					"id": 1,
					"title": "occaecati",
					"body": "um est autem"
			}

			const mockUsers = [
				{"id":1},
				{"id":2}
			]


			const req = {
				body: post,
			}

			const res = {
				status: jest.fn().mockReturnThis(),
				send:jest.fn()
			}
			const axios = {
				get: jest.fn().mockReturnValue({data:mockUsers}),
				post: jest.fn().mockReturnValue({data:{id:1000}})
			}

			await postHandler({axios}).post(req,res)
			expect(res.status.mock.calls).toEqual([[201]])
			expect(res.send.mock.calls).toEqual([
				[{id:1000}]
			])
			expect(axios.get.mock.calls).toEqual([
				['https://jsonplaceholder.typicode.com/users']
			])
			expect(axios.post.mock.calls).toEqual([
				['https://jsonplaceholder.typicode.com/posts',post]
			])
		})

		it('Should not create if userId does not exist',async()=>{
			const post = {
				"userId": 10,
				"id": 1,
				"title": "occaecati",
				"body": "um est autem"
			}

			const mockUsers = [
				{"id":1},
				{"id":2}
			]


			const req = {
				body: post,
			}

			const res = {
				status: jest.fn().mockReturnThis(),
				send:jest.fn(),
				sendStatus:jest.fn(),
			}
			const axios = {
				get: jest.fn().mockReturnValue({data:mockUsers}),
				post: jest.fn().mockReturnValue({data:{id:1000}})
			}

			await postHandler({axios}).post(req,res)
			expect(res.sendStatus.mock.calls).toEqual([
				[500]
			])
			expect(axios.post.mock.calls).toEqual([])
		})

		it('Should update',async () => {

			const put = {
				"userId": 1,
				"id": 1,
				"title": "jjj",
				"body": "um jjj jj"
			}
			const req = {
				body: put,
			}
			const res = {
				status: jest.fn().mockReturnThis(),
				send:jest.fn().mockReturnValue({data:put}),
			}
			const axios = {
				put: jest.fn().mockReturnValue({data:put})
			}

			await postHandler({axios}).put(req,res)

			expect(axios.put.mock.calls.length).toBe(1)
			expect(res.status.mock.calls).toEqual([[200]])

		})

		it("Should return warning is the put doesn't return nothing ", async() => {
			const put = {
				"userId": 1,
				"id": 1,
				"title": "jjj",
				"body": "um jjj jj"
			}

			const req = {
				body: put,
			}
			const res = {
				status: jest.fn().mockReturnThis(),
				send:jest.fn().mockReturnValue({data:put}),
				sendStatus:jest.fn()
			}
			const axios = {
				put: jest.fn().mockReturnValue({})
			}

			await postHandler({axios}).put(req,res)
			expect(axios.put.mock.calls.length).toBe(1)
			expect(res.sendStatus.mock.calls).toEqual([
				[409]
			])
		});
	})
})