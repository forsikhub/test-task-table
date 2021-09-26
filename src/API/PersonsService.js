import axios from 'axios';

export default class PersonsService{
    static async getAllPersons(){
        const response = await axios.get('https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json')
        return response.data
    }
}