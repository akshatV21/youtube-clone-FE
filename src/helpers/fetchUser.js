const fetchUser = async token => {
  const request = await fetch(`${CONFIG.API_URL}/user`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  const response = await request.json()

  if (!response.success) {
    console.log("Failed to fetch user!")
    return
  }
  console.log(response.user)
  return response.user
}

export default fetchUser
