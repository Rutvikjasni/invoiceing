//importing dependencies
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const generatePDF = require('./views/lib/generatePDF');
const Gmail = require('./views/gmail/gmail');
const ejs = require('ejs');
const path = require('path');

const person = [
  {
    id: 1,
    name: 'Vinny Olekhov',
    template: 'template2.ejs',
    address: 'PO Box 14377',
    email:"vivek.vaghani@flexteam.in",
    billTo: 'Kathi Hellyar',
    billToAddress: '080 Comanche Crossing',
    invoiceDate: '18-04-2022',
    invoiceNo: '3024922652',
    dueDate: '02-08-2022',
    lines: [
      {
        description: 'Stenosis of left lacrimal sac',
        hours: 1,
        rate: 1,
        amount: 9902
      }
    ],
    subTotal: 8410.5,
    rounding: 0.5,
    total: 9346,
  },
  {
    id: 2,
    name: 'Tobey Merwood',
    template: 'template1.ejs',
    address: '11th Floor',
    email:"vivekvaghani307@gmail.com",
    billTo: 'Elden Menichi',
    billToAddress: '8293 Beilfuss Road',
    invoiceDate: '07-10-2022',
    invoiceNo: '8082109394',
    dueDate: '18-12-2022',
    lines: [
      {
        description: 'Melanoma in situ of anal skin',
        hours: 1,
        rate: 1,
        amount: 2966
      }
    ],
    subTotal: 7044.7,
    rounding: 0.7,
    total: 5600,
  },
  {
    id: 3,
    name: 'Georgia Ormistone',
    template: 'template3.ejs',
    address: 'Apt 1867',
    email:"gajerasunny15@gmail.com",
    billTo: 'Kacy Ricardon',
    billToAddress: '11414 Brown Point',
    invoiceDate: '12-05-2021',
    invoiceNo: '8547478078',
    dueDate: '09-11-2022',
    lines: [
      {
        description: 'Zoster ocular disease',
        hours: 1,
        rate: 1,
        amount: 2959
      }
    ],
    subTotal: 5878.3,
    rounding: 2.7,
    total: 14770,
    bank: 'Research Associate',
    accountNo: '66-042-9458',
    ifscCode: "SBI00003232"
  },
  {
    id: 4,
    name: 'Oran Dunphy',
    template: 'template4.ejs',
    address: '15th Floor',
    email:"ritikjasani119@gmail.com",
    billTo: 'Lynelle Brockman',
    billToAddress: '45 Fairfield Hill',
    invoiceDate: '06-11-2021',
    invoiceNo: '5211496485',
    dueDate: '15-02-2022',
    lines: [
      {
        description: 'Laryngeal diphtheria',
        hours: 1,
        rate: 1,
        amount: 1791
      }
    ],
    subTotal: 1475.8,
    rounding: 2.9,
    total: 12134,
    bank: 'Research Associate',
    accountNo: '70-517-8312',
    ifscCode: "SBI00003232"
  },
  {
    id: 5,
    name: 'Zolly Peers',
    template: 'template5.ejs',
    address: 'Room 233',
    email:"drashtikalathiya955@gmail.com",
    billTo: 'Al Tindall',
    billToAddress: '05 Blackbird Park',
    invoiceDate: '07-09-2021',
    invoiceNo: '9619617606',
    dueDate: '21-01-2023',
    lines: [
      {
        description: 'Laceration w foreign body of pharynx and cervical esophagus',
        hours: 1,
        rate: 1,
        amount: 4197
      }
    ],
    subTotal: 4218.6,
    rounding: -2.9,
    total: 5375,
    bank: 'Research Associate',
    accountNo: '70-517-8312',
    ifscCode: "SBI00003232"
  },
  {
    id: 6,
    name: 'Felic Power',
    template: 'template2.ejs',
    address: 'PO Box 65004',
    email:"ritikjasani1@gmail.com",
    billTo: 'Yorgos Jakubowski',
    billToAddress: '25855 1st Avenue',
    invoiceDate: '04-10-2022',
    invoiceNo: '1065785666',
    dueDate: '05-03-2022',
    lines: [
      {
        description: 'Poisoning by hemostatic drug, intentional self-harm',
        hours: 1,
        rate: 1,
        amount: 9400
      }
    ],
    subTotal: 3230.5,
    rounding: 0.2,
    total: 6725,
    bank: 'Account Representative I',
    accountNo: '62-638-3114',
    ifscCode: "SBI00003232"
  },
  {
    id: 7,
    name: 'Aldrich Pykerman',
    template: 'template.ejs',
    address: 'Room 864',
    email:"ritikjasani@gmail.com",
    billTo: 'Sal MacKenzie',
    billToAddress: '6102 Shoshone Avenue',
    invoiceDate: '18-11-2020',
    invoiceNo: '7303607625',
    dueDate: '08-09-2022',
    lines: [
      {
        description: 'Partial traumatic amputation at unsp hip joint, init encntr',
        hours: 1,
        rate: 1,
        amount: 5600
      }
    ],
    subTotal: 4197.6,
    rounding: 2,
    total: 7555,
  },
  {
    id: 8,
    name: 'Clayborn Drury',
    template: 'template.ejs',
    address: 'PO Box 82827',
    email:"gajerasunny@gmail.com",
    billTo: 'Borg Rizzone',
    billToAddress: '938 Shoshone Pass',
    invoiceDate: '17-12-2021',
    invoiceNo: '9284351596',
    dueDate: '24-03-2022',
    lines: [
      {
        description: 'Nexdtve age-rel mclr degn, unsp, adv atrpc w/o sbfvl involv',
        hours: 1,
        rate: 1,
        amount: 6275
      }
    ],
    subTotal: 8451.4,
    rounding: 2,
    total: 9875,
    bank: 'Librarian',
    accountNo: '30-683-4141',
    ifscCode: "SBI00003232"
  },
  {
    id: 9,
    name: 'Flynn Winmill',
    template: 'template2.ejs',
    address: 'PO Box 92894',
    email:"ritikjasani112@gmail.com",
    billTo: 'Ekaterina Mullally',
    billToAddress: '71070 Mendota Drive',
    invoiceDate: '15-08-2021',
    invoiceNo: '1374101990',
    dueDate: '20-07-2022',
    lines: [
      {
        description: 'Other idiopathic scoliosis, site unspecified',
        hours: 1,
        rate: 1,
        amount: 3294
      }
    ],
    subTotal: 3240.8,
    rounding: 0.1,
    total: 10382,
  },
  {
    id: 10,
    name: 'Melisent Currie',
    template: 'template.ejs',
    address: 'Apt 1896',
    email:"ritikjasani110@gmail.com",
    billTo: 'Galven Di Boldi',
    billToAddress: '9270 Paget Pass',
    invoiceDate: '13-06-2022',
    invoiceNo: '5379387071',
    dueDate: '28-11-2022',
    lines: [
      {
        description: 'Nexdtve age-rel mclr degn, r eye, adv atrpc w sbfvl involv',
        hours: 1,
        rate: 1,
        amount: 9525
      }
    ],
    subTotal: 1427.3,
    rounding: -2.5,
    total: 13073,
  }
]

// Calling form.js from models
// var Form = require("./models/form");
//middlewares
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

//rendering form.ejs
app.get('/', function(req, res) {
  res.render('form', { people: person });
});

app.get('/contractor', function(req, res) {
  res.render('contractor', { people: person });
});

// form submission
app.get('/result', (req, res) => {
  res.render('result');
});

//creating form
app.post('/', async function(req, res) {
  var date = req.body.date
  var selectedPerson = req.body.selectedPerson;

  console.log('selectedPerson => selectedPerson :: ', selectedPerson);
  for (const personData of person) {
    if (selectedPerson.includes(String(personData.id))) {
      ejs.renderFile(path.join(__dirname, './views/templates', `${personData.template}`), {personData}, async (err, data) => {
        if (err) {
          console.error(err);
          // res.send(err);
        } else {

          const pdf = await generatePDF(data);
          // Email person.email
          await Gmail(personData.email, pdf);
        }
      });
    }
  }

  res.render('form', { people: person });
});

app.post('/contractor',function(req, res) {
  console.log(req,'req');
})

// Starting the server at port 3000
app.listen(3000, function() {
  console.log('Server running on port 3000');
});