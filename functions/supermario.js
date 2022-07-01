exports.handler = async () => {
    console.log('functions ran')
    const data = {name: 'mario', age: 35, job: 'plumber'}
    return {
        statuscode: 200,
        body: JSON.stringify(data)
    }
}