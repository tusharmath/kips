/**
 * Created by tushar on 24/06/18
 */

import axios from 'axios'

type RepoParams = {
  name: string
  username: string
  password: string
  description?: string
  otp?: () => Promise<string>
}

async function getAxiosPromise(p: RepoParams) {
  return axios.post(
    'https://api.github.com/user/repos',
    {
      name: p.name,
      description: p.description
    },
    {
      auth: {
        username: p.username,
        password: p.password
      },
      headers: p.otp ? {'X-GitHub-OTP': await p.otp()} : {},
      validateStatus: () => true
    }
  )
}

export const createRepository = async (p: RepoParams) => {
  const response = await getAxiosPromise({
    name: p.name,
    username: p.username,
    password: p.password,
    description: p.description
  })

  if (response.status === 200) {
    return response.data
  } else {
    const response = await getAxiosPromise(p)
    return response.data
  }
}
