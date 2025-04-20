import { accountsRepo }  from "../../repos/users-repo"

export async function POST(request) {
    const { email, password } = await request.json()
    const response = await accountsRepo.getUser(email, password)
console.log(response);
    if (response.error)
        return Response.json(response, { status: 401 })

    return Response.json(response, { status: 200 })
}