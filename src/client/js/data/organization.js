const S = (n, h, s) => ({ n, h, s }),
  N = (n, h, c, lv) => ({ n, h, c, lv });
const T = N("Chief Executive Officer", "Sonny Arca Adryanto", [
  N(
    "Audit Committee",
    "*Yorie Destia Yolanda",
    [N("Member", "New", undefined, 3)],
    2,
  ),
  N(
    "Project & Performance Management",
    "*Bonny Tofani Antonio",
    [
      N("SPPG", "Mochamad Abdul Rochim", undefined, 3),
      N("Performance Management", "*Nadiyah", undefined, 3),
    ],
    2,
  ),
  N("Finance", "Chief: Handy Betayuliawan\nAdvisor: Sonny Arca A. (Tax)", [
    N("Finance", "*Handy Betayuliawan", [
      S("C/F & Payment", "Reza", []),
      S("Finance", "Amelia Nurjanah", [
        "Winda Anggraeni",
        "Agustina Dewi Anjani",
        "Semy Novianti",
        "Sintya Indah Suryani",
        "Muhammad Fahri Yudhirakhman",
      ]),
    ]),
    N("Accounting MPO & Tax", "Yorie Destia Yolanda\n*Deputy Chief", [
      S("Accounting", "Mila Sugiarti", [
        "Sabnah Musdjalifah",
        "Suci Islamiati Irfan",
      ]),
      S("Tax", "Deriyansyah", ["Muhammad Fadillah", "Rima Kusmana"]),
    ]),
    N("Non MPO Accounting", "Rosita", [
      S("Accounting Logistic", "Didin Saefudin", ["Septiari Yulfida"]),
      S("Accounting others", "*Rosita", ["Liska Perdita", "Maisya Nabilla"]),
    ]),
    N("Legal", "Silvi Ariyani", [
      S("External Affair", "*Silvi Ariyani", []),
      S("Legal", "*Silvi Ariyani", []),
    ]),
  ]),
  N(
    "HR & Ops. Support",
    "Chief: Agus Suwandhi\nAdvisor: Bonny Tofani A. (HR)",
    [
      N("HR", "Wibowo Syukur Santosa", [
        S("HR Planning & Development", "*Wibowo Syukur Santosa", []),
        S("HR Operations", "Bella Novitania", [
          "Ira Aprillia",
          "Zalfaa Alya Fauzia",
        ]),
      ]),
      N("IT", "Iwan Surjadi", [
        S("IT Ops. & Maintenance", "Muhammad Chaerul Rachman", [
          "Siroz",
          "Agung Permana",
          "Yudianto Agung Prasetio",
        ]),
        S("IT Development", "*Iwan Surjadi", [
          "Rizqi Ardiansyah",
          "Abdurrahman Alfaruqi",
        ]),
      ]),
      N("Facilities Management", "Freedaddy Adisaputra", [
        S("Dev. & Maintenance", "*Freedaddy Adisaputra", ["Saepulloh"]),
        S("Building Management", "Emmy Silitonga", [
          "Deny Setiawan",
          "Virgi Aryanto",
          "Anton Alim",
          "Muhammad Anhar",
          "Rano Wijaya",
          "Dwi Yulianto",
          "Muhammad Tohir",
          "Mirats Lidanto Gandhi",
        ]),
      ]),
    ],
  ),
  N("Sales & Marketing", "Chief: *Sonny Arca Adryanto", [
    N("Marketing", "*Sonny Arca Adryanto", [
      S("MPO", "Dina Dwi Juliana", [
        "Falda Bangkit Santosa",
        "Ahmad Syehandani Almeindra",
      ]),
      S("Non MPO", "*Dina Dwi Juliana", []),
    ]),
    N("Sales", "Dimas Gaharu Gumilang", [
      S("Online Sales", "*Dimas Gaharu Gumilang", ["Rifky Yosfaldi Sirait"]),
      S("Offline Sales & Outlet Development", "Arif Kurniawan", [
        "Bintang Surya Adinegara",
        "Dimas Panji Asmoro",
        "Arina Manasikana",
        "Syahidah Khoirunnisa",
      ]),
    ]),
  ]),
  N("Supply Chain Management", "Chief: Bonny Tofani Antonio", [
    N("Production & Logistic", "Asmawi Atmawijaya", [
      S("Inventory & Distribution", "Agung Ramadhan", [
        "Budi Hernawan (Team Leader)",
        "Hariyanto",
        "Muhammad Agra Kurniawan",
        "Harno",
        "Iksan Nawawi",
        "Saefudin",
        "Krisna Danan Jaya",
        "Holland Pratama",
        "Wahyu Saputra",
        "Warsudin",
        "Iwan Sobirin",
      ]),
      S("Logistic Planning & Control", "*Asmawi Atmawijaya", [
        "Jerri Irawan",
        "Exilda Muthi'ah",
      ]),
      S("Production & Quality", "*Asmawi Atmawijaya", [
        "Asropi (Team Leader)",
        "Suhemi (Team Leader)",
        "Rai Puji",
        "Idris",
        "Andri",
        "Encum",
        "Uce",
        "Wawan Kuswandi",
        "Burhan",
        "Memed",
        "Kustiwa",
        "M Dayat",
        "Ario Gentur Laksono",
      ]),
    ]),
    N("Procurement", "Sigit Prasetio", [
      S("Procurement Planning & Control", "*Sigit Prasetio", [
        "Nadiyahsari Dinhaq",
      ]),
      S("Procurement #1 [Strategic & Core]", "*Sigit Prasetio", [
        "Muthia Nur Amalina",
      ]),
      S("Procurement #2 [Indirect & General]", "*Mochamad Abdul Rochim", [
        "Andika Noviendra",
      ]),
    ]),
  ]),
  N("Operation", "Chief: Risman", [
    N("Technical", "*Risman", [
      S("Product & Process RnD", "*Risman", ["Alya Nur Shabrina"]),
      S("QA - QC", "Viny Fahriani", ["Muhibin", "Mahfud"]),
    ]),
    N("Outlet Ops", "M. Janu Ramanda Pohan", [
      S("Planning, Aset & Improvement", "*M. Janu Ramanda Pohan", [
        "Sukmayadi",
        "Lukman Fauji",
        "Firly Dwi Handika",
      ]),
      N("Area Operations", "", [
        S("Supervisor Outlet", "", [
          "Coord: Budi Purnomo",
          "Iwan Ridwanulloh",
          "Wandriyanto",
          "Yoga",
          "Asep Alawi",
          "Angga Aditama",
          "Zenal Haris",
          "Andri Sulvi Aziz",
          "Nikko Widyantoro",
          "Abdurrahman Taufik",
          "Rizal M. Abdullah",
        ]),
      ]),
    ]),
  ]),
]);
