import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Md5} from 'ts-md5/dist/md5';

const PrivateKey = '269e941becdf0764634f888ee5b9315dd6bcadfd';
const PublicKey = '1a00e7cab1eed7a269ddae28958caf95';
const TimeStamp = Date.now();
const hash = Md5.hashStr(TimeStamp + PrivateKey + PublicKey).toString();
let count = 0;

@Injectable()
export class ApiService {

    constructor(private _http: Http) {
    }

    allHeroes(reference, origin, value) {
        let search = '';
        if (origin !== '' && value.length) {
            search = '&' + origin + '=' + JSON.stringify(value).replace('[', '').replace(']', '').replace(/,/g , '%2C');
        }
        if (reference === '' || reference === 'newFilter') {
            count = 0;
            return this._http.get('http://gateway.marvel.com/v1/public/comics?ts=' + TimeStamp + search + '&orderBy=focDate'
                + '&apikey=' + PublicKey + '&hash=' + hash + '&limit=16').map(res => res.json());
        } else {
            count += 1;
            return this._http.get('http://gateway.marvel.com/v1/public/comics?ts=' + TimeStamp + search +  '&orderBy=focDate'
                + '&apikey=' + PublicKey + '&hash=' + hash + '&limit=16' + '&offset=' + count).map(res => res.json());
        }
    }

}
