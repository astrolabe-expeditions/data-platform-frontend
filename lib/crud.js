export class CRUD {
  constructor(url) {
    this.url = url
    this.data = null
  }

  async getData() {
    const res = await fetch(this.url, {
      next: { revalidate: 10000 },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res.json()
  }

  remove(id) {
    fetch(this.url, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'content-type': 'application/json' },
    }).catch((e) => console.log(e))
  }

  insert(formData) {
    fetch(this.url, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: { 'content-type': 'application/json' },
    }).catch((e) => console.log(e))
  }
}
