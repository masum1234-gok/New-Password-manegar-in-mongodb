# New Password Manager in MongoDB

🔐 একটি পাসওয়ার্ড ম্যানেজার অ্যাপ্লিকেশন যা MongoDB ডাটাবেস ব্যবহার করে নিরাপদে পাসওয়ার্ড সংরক্ষণ ও পরিচালনা করে।

## 📌 পরিচিতি

"New Password Manager in MongoDB" একটি সিকিউর পাসওয়ার্ড ম্যানেজার অ্যাপ্লিকেশন যা MongoDB ডাটাবেস ব্যবহার করে তৈরি করা হয়েছে। এটি ব্যবহারকারীদের পাসওয়ার্ড নিরাপদে সংরক্ষণ, সম্পাদনা ও মুছে ফেলার সুবিধা প্রদান করে। অ্যাপ্লিকেশনটি Node.js, Express.js, এবং MongoDB ব্যবহার করে তৈরি করা হয়েছে।
 
## 🚀 বৈশিষ্ট্যসমূহ

- **নিরাপদ পাসওয়ার্ড সংরক্ষণ**: পাসওয়ার্ডগুলি MongoDB ডাটাবেসে নিরাপদে সংরক্ষিত হয়।
- **CRUD অপারেশন**: পাসওয়ার্ড তৈরি, পড়া, আপডেট ও মুছে ফেলার সুবিধা।
- **ব্যবহারকারী বান্ধব ইন্টারফেস**: সহজ ও সোজা ইন্টারফেস।
- **RESTful API**: পাসওয়ার্ড পরিচালনার জন্য RESTful API প্রদান।

## 📂 ফাইল স্ট্রাকচার

```
New-Password-manegar-in-mongodb/
├── backend/
│   ├── controllers/
│   │   └── passwordController.js
│   ├── models/
│   │   └── passwordModel.js
│   ├── routes/
│   │   └── passwordRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── public/
│   └── index.html
├── src/
│   └── App.jsx
├── .gitignore
├── README.md
├── aoishjf.jsx
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

- `backend/`: সার্ভার-সাইড কোড ও কনফিগারেশন ফাইল।
  - `controllers/passwordController.js`: পাসওয়ার্ড সম্পর্কিত লজিক।
  - `models/passwordModel.js`: MongoDB মডেল।
  - `routes/passwordRoutes.js`: API রাউটস।
  - `.env`: পরিবেশ ভেরিয়েবল।
  - `server.js`: সার্ভার কনফিগারেশন।
  - `package.json`: Node.js প্যাকেজ ডিপেন্ডেন্সি।

- `public/`: ক্লায়েন্ট-সাইড ফাইল।
  - `index.html`: মূল HTML ফাইল।

- `src/`: রিয়্যাক্ট অ্যাপ্লিকেশন ফাইল।
  - `App.jsx`: মূল রিয়্যাক্ট কম্পোনেন্ট।

- অন্যান্য কনফিগারেশন ফাইল:
  - `.gitignore`: Git এর জন্য অগ্রাহ্য ফাইল।
  - `eslint.config.js`: ESLint কনফিগারেশন।
  - `package-lock.json`: প্যাকেজ ডিপেন্ডেন্সি লক ফাইল।
  - `postcss.config.js`: PostCSS কনফিগারেশন।
  - `tailwind.config.js`: Tailwind CSS কনফিগারেশন।
  - `vite.config.js`: Vite কনফিগারেশন।

## 🛠️ ইনস্টলেশন ও রান

1. রিপোজিটরি ক্লোন করুন:

   ```bash
   git clone https://github.com/mir-md-masum-billah/New-Password-manegar-in-mongodb.git
   ```

2. `backend/` ডিরেক্টরিতে যান এবং ডিপেন্ডেন্সি ইনস্টল করুন:

   ```bash
   cd New-Password-manegar-in-mongodb/backend
   npm install
   ```

3. `.env` ফাইলে MongoDB URI এবং অন্যান্য পরিবেশ ভেরিয়েবল কনফিগার করুন।

4. সার্ভার চালু করুন:

   ```bash
   npm start
   ```

5. ক্লায়েন্ট-সাইড অ্যাপ্লিকেশন চালু করতে, `src/` ডিরেক্টরিতে গিয়ে:

   ```bash
   cd ../src
   npm install
   npm start
   ```

## 🎨 কাস্টমাইজেশন

- **MongoDB URI**: `.env` ফাইলে MongoDB URI কনফিগার করুন।
- **পাসওয়ার্ড ফিল্ড**: `passwordModel.js` ফাইলে পাসওয়ার্ড সম্পর্কিত ফিল্ড কাস্টমাইজ করুন।
- **ইউজার ইন্টারফেস**: `App.jsx` ফাইলে UI উপাদান কাস্টমাইজ করুন।

## 📄 লাইসেন্স

এই প্রজেক্টটি [MIT লাইসেন্স](https://opensource.org/licenses/MIT) এর অধীনে লাইসেন্সপ্রাপ্ত।

## 📢 অবদান

আপনি যদি এই প্রজেক্টে অবদান রাখতে চান, তাহলে একটি Pull Request খুলুন বা Issues সেকশনে আপনার মতামত জানান।
