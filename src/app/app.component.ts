import {Component, OnInit} from '@angular/core';
import {ApiService} from './api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ApiService]
})

export class AppComponent implements OnInit {

    selectedValue = [];
    filteredValue = [];
    heroes = [];
    browseBy = [];
    series = [
        {id: 18454, name: '100th Anniversary Special (2014)'},
        {id: 13379, name: '15 Love (2011)'},
        {id: 13380, name: '15-Love GN-TPB (2013 - Present)'},
        {id: 489, name: '1602 (2003 - 2004)'},
        {id: 19244, name: '1602 Witch Hunter Angela (2015)'},
        {id: 20293, name: '1602 Witch Hunter Angela (2016)'},
        {id: 980, name: 'Son of M (2005 - 2006)'},
        {id: 3297, name: 'Marvel Masterworks'},
        {id: 3296, name: 'Ultimate X-Men Vol. 4: Hellfire & Brimstone (2003 - Present)'},
        {id: 9526, name: 'Ms. Marvel Vol. 9: Best You Can Be (2010)'},
        {id: 2917, name: 'Spider-Man Magazine: Great Power (2007)'},
        {id: 9537, name: 'New Mutants: Necrosha (2010)'},
        {id: 3291, name: 'Exiles Vol. 5: Unnatural Instincts (2005)'},
        {id: 9553, name: 'Punisher: Dead End (2010)'},
        {id: 849, name: 'Punisher: The Tyger (2006)'},
        {id: 3126, name: 'Silver Surfer: Requiem Premiere (2007 - Present)'},
        {id: 9569, name: 'X-Men: S.W.O.R.D.: No Time to Breathe (2010)'},
        {id: 2914, name: 'Punisher Max Annual (2008 - Present)'},
        {id: 2943, name: 'Immortal Iron Fist Vol. 1: The Last Iron Fist Story (2007)'},
        {id: 9593, name: 'Spider-Man Noir: Eyes Without a Face (2010)'},
        {id: 2951, name: 'Spider-Man and the Fantastic Four: Silver Rage (2007)'},
        {id: 9603, name: 'Spider-Man: Return of the Black Cat (2010)'},
        {id: 2959, name: 'Wolverine Classic Vol. 5 (2007)'},
        {id: 9619, name: 'The Marvels Project: Birth of the Super Heroes (2010)'}
    ];
    characters = [
        {id: 1009183, name: 'Black Bird'},
        {id: 1009249, name: 'Count Nefaria'},
        {id: 1009302, name: '"Fenris"'},
        {id: 1009350, name: 'Holy'},
        {id: 1009436, name: 'Mauler'},
        {id: 1009475, name: 'Nomad'},
        {id: 1009650, name: 'Tempest'},
        {id: 1010332, name: 'Overlord'},
        {id: 1010681, name: 'Mercury'},
        {id: 1010728, name: 'The Executioner'},
        {id: 1010786, name: 'Jack Murdock'},
        {id: 1010902, name: 'Mordo'},
        {id: 1010952, name: 'Mysterio (Francis Klum)'},
        {id: 1011014, name: 'Lady Mastermind'},
        {id: 1011059, name: 'Living Tribunal'},
        {id: 1011146, name: 'Infant Terrible'},
        {id: 1011190, name: 'Captain Cross'},
        {id: 1011226, name: '"War Machine (Ultimate)"'},
        {id: 1010772, name: 'Jule Carpenter'},
        {id: 1011257, name: 'Lily Hollister'},
        {id: 1011424, name: 'Miss America'},
        {id: 1010835, name: 'Asylum'},
        {id: 1010765, name: 'Werewolf By Night'},
        {id: 1009689, name: 'Vanisher (Ultimate)'},
    ];
    creators = [
        {id: 372, name: 'Angel Medina'},
        {id: 361, name: 'Cory Petit'},
        {id: 363, name: 'Dan Kemp'},
        {id: 362, name: 'Scott Hanna'},
        {id: 372, name: 'Roberto Aguirre-Sacada'},
        {id: 1247, name: 'Bob Layton'},
        {id: 8125, name: 'Bob McLeod'},
        {id: 2784, name: 'David Michelinie'},
        {id: 399, name: 'Jim Novak'},
        {id: 214, name: 'John Romita JR.'},
        {id: 1832, name: 'Bob Sharen'},
        {id: 958, name: 'Roger Stern'},
        {id: 2030, name: 'Bob Wiacek'},
        {id: 4014, name: 'Axel Alonso'},
        {id: 174, name: 'Sean Chen'},
        {id: 420, name: 'Sandu Florea'},
        {id: 4266, name: 'Ian Hannin'},
        {id: 6229, name: 'John Miesegaes'},
        {id: 527, name: 'Tom Palmer'},
        {id: 418, name: 'Rob Rodi'},
        {id: 8429, name: 'Dave Sharpe'},
        {id: 26, name: 'Bill Sienkiewicz'},
        {id: 2278, name: 'Paul Abrams'},
        {id: 3637, name: 'Scott Lobdell'},
    ];

    hover = '';
    show = false;
    origin = '';
    filter = '';

    showLoadButtom = false;

    active1 = '';
    active2 = '';
    active3 = '';

    constructor(public _apiService: ApiService) {
    }

    ngOnInit() {
        this.getAllHeroes('', '', '');
    }

    getAllHeroes(reference, origin, values) {

        this.filter = origin;
        const items = [];
        const there = this;

        if (reference !== '') {
            if (origin !== '' && values.length) {
                if (reference !== 'loadMore') {
                    this.filteredValue = [];
                    values.forEach(value => {
                        there.filteredValue.push(value);
                        items.push(value.id);
                    });
                    this.heroes = [];
                } else {
                    this.filteredValue.forEach(value => {
                        items.push(value.id);
                    });
                }
            } else {
                this.filteredValue.forEach(value => {
                    items.push(value.id);
                });
            }
        }

        this._apiService.allHeroes(reference, this.filter, items).subscribe(
            res => {
                const that = this;
                const obj = res.data;
                const totalPerPage = obj.offset * obj.limit;
                this.showLoadButtom = obj.limit <= obj.count;
                if (totalPerPage > obj.total) {
                    this.showLoadButtom = false;
                }
                obj.results.forEach(function (value, index) {
                    that.heroes.push({
                        id: value.id,
                        title: value.title,
                        class: that.hover,
                        description: value.description,
                        // modified: moment(value.modified).format('LL'),
                        image: value.thumbnail.path + '.' + value.thumbnail.extension,
                        creator: (value.creators.items[0] ? value.creators.items[0].name : '*No Writer Related*'),
                        details_url: value.urls[0].url
                    });
                });
            });

        this.show = false;

    }

    bigImg(x) {
        this.hover = 'img-hover';
        this.heroes[x].class = this.hover;
    }

    normalImg(x) {
        this.hover = '';
        this.heroes[x].class = this.hover;
    }


    clickedInside(ref) {
        this.selectedValue = [];
        this.browseBy = [];
        switch (ref) {
            case 'series':
                if (this.show && this.origin === ref) {
                    this.active1 = '';
                    this.show = false;
                } else {
                    this.active1 = 'btn-drop-active';
                    this.active2 = '';
                    this.active3 = '';
                    this.show = true;
                    this.origin = ref;
                    this.browseBy = this.series;
                }
                break;
            case 'characters':
                if (this.show && this.origin === ref) {
                    this.active2 = '';
                    this.show = false;
                } else {
                    this.active1 = '';
                    this.active2 = 'btn-drop-active';
                    this.active3 = '';
                    this.show = true;
                    this.origin = ref;
                    this.browseBy = this.characters;
                }
                break;
            case 'creators':
                if (this.show && this.origin === ref) {
                    this.active3 = '';
                    this.show = false;
                } else {
                    this.active1 = '';
                    this.active2 = '';
                    this.active3 = 'btn-drop-active';
                    this.show = true;
                    this.origin = ref;
                    this.browseBy = this.creators;
                }
                break;
        }
    }

    change(e, type) {
        if (e.target.checked) {
            const obj = {id: type.id, name: type.name};
            this.selectedValue.push(obj);
        } else {
            let index = 0;
            this.selectedValue.forEach((value, i) => {
                if (value.id === type.id) {
                    index = i;
                }
            });
            this.selectedValue.splice(index, 1);
        }
    }

    deleteFitleredItem(type) {
        let index = 0;
        this.selectedValue.forEach((value, i) => {
            if (value.id === type.id) {
                index = i;
            }
        });
        this.selectedValue.splice(index, 1);
        this.filteredValue.splice(index, 1);

        this.heroes = [];
        this.getAllHeroes('newFilter', this.filter, this.selectedValue);
    }

}
