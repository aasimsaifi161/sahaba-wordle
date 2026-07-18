export interface Sahabi {
  name: string;      // Uppercase transliteration for game logic
  fullName: string;  // Full name for UI display
  fact: string;      // Brief one-line historical fact
}

// Curated list of well-known companions (Sahaba/Sahabiyat) of varying lengths
export const SAHABA_LIST: Sahabi[] = [
  {
    name: "ABUBAKR",
    fullName: "Abu Bakr al-Siddiq",
    fact: "The closest companion and first Caliph, known as Al-Siddiq for his absolute truthfulness and unwavering support."
  },
  {
    name: "UMAR",
    fullName: "Umar ibn al-Khattab",
    fact: "The second Caliph, renowned for his justice, strength, and establishing key administrative structures in Islam."
  },
  {
    name: "UTHMAN",
    fullName: "Uthman ibn Affan",
    fact: "The third Caliph, known for his modesty, generosity, and compiling the official standardized text of the Quran."
  },
  {
    name: "ALI",
    fullName: "Ali ibn Abi Talib",
    fact: "The cousin and son-in-law of the Prophet, the fourth Caliph, celebrated for his profound wisdom and courage."
  },
  {
    name: "BILAL",
    fullName: "Bilal ibn Rabah",
    fact: "The first Mu'adhin (caller to prayer) of Islam, known for his beautiful voice and rock-solid faith under intense persecution."
  },
  {
    name: "KHALID",
    fullName: "Khalid ibn al-Walid",
    fact: "The undefeated general of Islam, nicknamed the 'drawn Sword of Allah' by the Prophet for his tactical genius."
  },
  {
    name: "HAMZA",
    fullName: "Hamza ibn Abd al-Muttalib",
    fact: "The uncle of the Prophet, affectionately known as the 'Lion of Allah' for his legendary bravery and military skill."
  },
  {
    name: "TALHA",
    fullName: "Talha ibn Ubaydullah",
    fact: "One of the ten promised Paradise, who heroically shielded the Prophet with his own body during the Battle of Uhud."
  },
  {
    name: "JAFAR",
    fullName: "Ja'far ibn Abi Talib",
    fact: "The leader of the first migration to Abyssinia, known for his eloquence, charity, and being called 'the father of the poor'."
  },
  {
    name: "AMMAR",
    fullName: "Ammar ibn Yasir",
    fact: "One of the earliest converts to Islam, whose family was the first to make the ultimate sacrifice of martyrdom."
  },
  {
    name: "USAMA",
    fullName: "Usama ibn Zayd",
    fact: "The beloved commander appointed by the Prophet to lead the Muslim army at just eighteen years of age."
  },
  {
    name: "ARQAM",
    fullName: "Al-Arqam ibn Abi al-Arqam",
    fact: "His secret home (Dar al-Arqam) served as the sanctuary and educational hub for the early Muslims."
  },
  {
    name: "ABBAS",
    fullName: "Al-Abbas ibn Abd al-Muttalib",
    fact: "Paternal uncle of the Prophet who provided crucial support and protected him during early treaties."
  },
  {
    name: "MUSAB",
    fullName: "Mus'ab ibn Umayr",
    fact: "The first ambassador of Islam, sent to Madinah to teach the Quran and prepare the city for the migration."
  },
  {
    name: "UBAYY",
    fullName: "Ubayy ibn Ka'b",
    fact: "A master reciter and Quran scribe, described by the Prophet as the best reciter of this Ummah."
  },
  {
    name: "IMRAN",
    fullName: "Imran ibn Husain",
    fact: "A renowned companion, judge, and narrator of Hadiths who experienced greetings of peace from the angels."
  },
  {
    name: "UTBAH",
    fullName: "Utbah ibn Ghazwan",
    fact: "The seventh person to embrace Islam, an expert marksman, and the founder of the city of Basra."
  },
  {
    name: "BARAA",
    fullName: "Al-Baraa ibn Malik",
    fact: "A legendary warrior who single-handedly breached the enemy stronghold in the Battle of Yamamah."
  },
  {
    name: "JABIR",
    fullName: "Jabir ibn Abdullah",
    fact: "A prominent narrator of Hadiths who hosted the Prophet for a miracle meal during the Trench campaign."
  },
  {
    name: "MALIK",
    fullName: "Malik ibn al-Huwayrith",
    fact: "Reported the famous guideline for congregational prayer: 'Pray as you have seen me pray'."
  },
  {
    name: "SALIM",
    fullName: "Salim Mawla Abi Hudhayfah",
    fact: "A highly respected scholar and Quran teacher whom Omar ibn al-Khattab wished could succeed him."
  },
  {
    name: "UTBAN",
    fullName: "Utban ibn Malik",
    fact: "An Ansari leader who hosted the Prophet in his home and prayed with him in a dedicated prayer corner."
  },
  {
    name: "UQAIL",
    fullName: "Aqeel ibn Abi Talib",
    fact: "The elder brother of Ali ibn Abi Talib, celebrated for his unmatched expertise in Arab genealogy."
  },
  {
    name: "NUAYM",
    fullName: "Nu'aym ibn Mas'ud",
    fact: "Cleverly divided the confederate tribes from within, saving Madinah during the Battle of the Trench."
  },
  {
    name: "TAMIM",
    fullName: "Tamim al-Dari",
    fact: "A former Christian scholar who narrated the famous description of the Dajjal (Al-Jassasah) to the Prophet."
  },
  {
    name: "UBAID",
    fullName: "Ubaydah ibn al-Harith",
    fact: "A senior companion of Badr who was the first to command a military expedition in Islam."
  },
  {
    name: "YASIR",
    fullName: "Yasir ibn Amir",
    fact: "The father of Ammar, who along with his wife Sumayyah, was among the first martyrs of Islam."
  },
  {
    name: "SAEED",
    fullName: "Saeed ibn Zayd",
    fact: "One of the ten promised Paradise, known for his powerful prayers that were always answered."
  },
  {
    name: "MUADH",
    fullName: "Muadh ibn Jabal",
    fact: "The master of jurisprudence, described by the Prophet as knowing halal and haram best."
  },
  {
    name: "ADIYY",
    fullName: "Adiyy ibn Hatim",
    fact: "A Christian tribal king who embraced Islam, known for his exceptional charity and loyalty to Ali."
  },
  {
    name: "NUMAN",
    fullName: "Nu'man ibn Muqarrin",
    fact: "A leader of the Muzaynah tribe who served as the commander-in-chief at the Battle of Nihawand."
  },
  {
    name: "RAFIE",
    fullName: "Rafi' ibn Khadij",
    fact: "A young companion who participated in Uhud and Badr, later becoming a key narrator on agricultural rulings."
  },
  {
    name: "AAMIR",
    fullName: "Amer ibn Fuhayrah",
    fact: "A shepherd who covered the tracks of the Prophet and Abu Bakr during the migration to Cave Thawr."
  },
  {
    name: "TARIQ",
    fullName: "Tariq ibn Shihab",
    fact: "Met the Prophet and became a respected narrator of over eighty Hadiths on community matters."
  },
  {
    name: "AYAAS",
    fullName: "Iyas ibn Mu'adh",
    fact: "A young man from Madinah who embraced Islam before the Hijrah after hearing the Prophet recite Quran."
  },
  {
    name: "SAFIA",
    fullName: "Safiyyah bint Huyayy",
    fact: "Wife of the Prophet, notable for her deep intelligence, patience, and devotion."
  },
  {
    name: "SAWDA",
    fullName: "Sawdah bint Zam'ah",
    fact: "The second wife of the Prophet, famous for her humor, generosity, and loving nature."
  },
  {
    name: "HAFSA",
    fullName: "Hafsah bint Umar",
    fact: "Wife of the Prophet and daughter of Omar, entrusted with custody of the first written copy of the Quran."
  },
  {
    name: "ASMAA",
    fullName: "Asma bint Abi Bakr",
    fact: "Heroine of the Hijrah migration, nicknamed 'She of the Two Belts' for tearing her belt to tie supplies."
  },
  {
    name: "SALMAN",
    fullName: "Salman al-Farsi",
    fact: "The Persian companion who proposed digging the trench, protecting Madinah from defeat."
  },
  {
    name: "ZUBAIR",
    fullName: "Al-Zubayr ibn al-Awwam",
    fact: "The disciple of the Prophet, one of the ten promised Paradise, known for his courage and devotion."
  },
  {
    name: "SAAD",
    fullName: "Sa'd ibn Abi Waqqas",
    fact: "The first to shoot an arrow in the way of Islam, one of the ten promised Paradise, and a key general."
  },
  {
    name: "AISHAH",
    fullName: "Aisha bint Abi Bakr",
    fact: "Wife of the Prophet and mother of the believers, a leading scholar who narrated over two thousand Hadiths."
  },
  {
    name: "KHADIJAH",
    fullName: "Khadijah bint Khuwaylid",
    fact: "First wife of the Prophet and the first believer, who supported him with her wealth and comfort."
  },
  {
    name: "FATIMAH",
    fullName: "Fatimah bint Muhammad",
    fact: "The beloved youngest daughter of the Prophet, described as the leader of the women of Paradise."
  },
  {
    name: "KHABBAB",
    fullName: "Khabbab ibn al-Aratt",
    fact: "One of the earliest converts, a master swordsmith who endured severe torture for his faith."
  },
  {
    name: "HUDHAYFAH",
    fullName: "Hudhayfah ibn al-Yaman",
    fact: "The keeper of the Prophet's secrets, known for his unique intelligence in recognizing hypocrisy."
  },
  {
    name: "MIQDAD",
    fullName: "Al-Miqdad ibn Amr",
    fact: "A legendary equestrian who was the first horseman of Islam at the Battle of Badr."
  },
  {
    name: "THABIT",
    fullName: "Thabit ibn Qays",
    fact: "The spokesperson/orator of the Prophet, known for his powerful voice and eloquence."
  },
  {
    name: "SUHAYB",
    fullName: "Suhayb al-Rumi",
    fact: "Embraced Islam in Makkah and sacrificed all his material wealth to migrate to Madinah."
  },
  {
    name: "ZAYD",
    fullName: "Zayd ibn Harithah",
    fact: "The beloved companion of the Prophet and the only companion mentioned by name in the Quran."
  },
  {
    name: "ASIM",
    fullName: "Asim ibn Thabit",
    fact: "The hero whose body was protected by swarms of bees from being desecrated by his enemies."
  },
  {
    name: "KAB",
    fullName: "Ka'b ibn Malik",
    fact: "A poet of the Prophet, whose story of repentance and forgiveness is immortalized in the Quran."
  },
  {
    name: "SAHL",
    fullName: "Sahl ibn Sa'd",
    fact: "The last surviving companion in Madinah, who preserved many detailed descriptions of prophetic customs."
  },
  {
    name: "JUBAYR",
    fullName: "Jubayr ibn Mut'im",
    fact: "A respected expert in lineage who accepted Islam after hearing the Prophet recite Surah At-Tur."
  },
  {
    name: "WAHSHI",
    fullName: "Wahshi ibn Harb",
    fact: "Fell in battle on both sides: martyred Hamza before Islam, and later killed Musaylimah the liar after converting."
  }
];

// Helper to determine the daily Sahabi word based on local date
export function getDailyWord(date: Date = new Date()): { sahabi: Sahabi; dayIndex: number } {
  // Use a fixed epoch to compute the day count (e.g., Jan 1, 2026)
  const epoch = new Date(2026, 0, 1);
  // Get time at local midnight to keep it strictly aligned with day increments
  const dLocal = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffTime = dLocal.getTime() - epoch.getTime();
  const dayIndex = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  
  const wordIndex = dayIndex % SAHABA_LIST.length;
  const sahabi = SAHABA_LIST[wordIndex];
  
  return { sahabi, dayIndex };
}

// Validator function (no longer enforces English dictionary constraint)
export function isValidWord(word: string, targetLength: number): boolean {
  const upperWord = word.trim().toUpperCase();
  return upperWord.length === targetLength && /^[A-Z]+$/.test(upperWord);
}
