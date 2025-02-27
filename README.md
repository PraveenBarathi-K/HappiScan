# 🎉 HappieScan

## 📌 Overview
The **HappieScan** is a web application that allows users to participate in a fun competition where they can make wishes, generate QR codes, and scan QR codes to interact with others. The project consists of a **React frontend** and a **Node.js backend** running on a Linux server.

---

## 🚀 Features
- 🌟 **Make a Wish** - Users can enter their details and generate a unique QR code.
- 📸 **QR Code Scanner** - Scan QR codes to send wishes.
- 🏆 **Leaderboard** - Track the top users with the highest interactions.
- 📱 **Responsive Design** - Optimized for both mobile and desktop.
- 🎨 **Modern UI** - A black & white contrast theme with a neat and elegant design.

---

## 🏗️ Tech Stack
### **Frontend (React)**
- React.js (with Hooks)
- Tailwind CSS / Custom CSS for styling
- QR Code Generator
- React QR Scanner

### **Backend (Node.js + Express)**
- Express.js for API handling
- MongoDB for storing user data & leaderboard
- QR Code generation & validation
- Axios for API requests

### **Deployment**
- Linux Server (Ubuntu)
- Nginx (Reverse Proxy)
- PM2 (Process Manager for Node.js)
- Serve (for React production build)

---

## 🎯 Installation & Setup
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-repo.git
cd your-repo
```

### **2️⃣ Install Dependencies**
#### **Backend:**
```sh
cd backend
npm install
```

#### **Frontend:**
```sh
cd frontend
npm install
```

### **3️⃣ Run the App**
#### **Backend:**
```sh
npm start
```
OR using PM2:
```sh
pm install -g pm2
pm start server.js --name backend
pm save
```

#### **Frontend:**
```sh
npm start
```

---

## 🌍 Deployment on Linux Server
### **1️⃣ Setup Node.js & Nginx**
```sh
sudo apt update && sudo apt install nodejs npm nginx -y
```

### **2️⃣ Deploy Backend**
```sh
cd backend
npm install
pm start
```

### **3️⃣ Deploy Frontend**
```sh
cd frontend
npm install
npm run build
serve -s build -l 3000
```

### **4️⃣ Setup Nginx**
```sh
sudo nano /etc/nginx/sites-available/default
```
Replace content with:
```nginx
server {
    listen 80;
    server_name your-server-ip;

    location / {
        root /path-to-frontend/build;
        index index.html;
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Save and restart:
```sh
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### **5️⃣ Firewall Setup**
```sh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## 📜 API Endpoints
### **1️⃣ Generate QR Code**
```http
POST /api/wishes/generate_qr
```
#### **Request Body:**
```json
{
    "user_id": "123456",
    "name": "John Doe"
}
```
#### **Response:**
```json
{
    "qr_code": "base64_encoded_string"
}
```

### **2️⃣ Scan QR Code**
```http
POST /api/wishes/scan_qr
```
#### **Request Body:**
```json
{
    "from_user": "123456",
    "to_user": "654321"
}
```
#### **Response:**
```json
{
    "message": "Wish recorded successfully"
}
```

### **3️⃣ Leaderboard**
```http
GET /api/leader/leaderboard
```
#### **Response:**
```json
[
    {
        "user_id": "123456",
        "name": "John Doe",
        "total_points": 10
    }
]
```

---

## 🛠️ To-Do List
- ✅ Implement QR Code generation
- ✅ Add a leaderboard
- 🔜 Implement user authentication
- 🔜 Improve UI animations

---

## 🤝 Contributing
1. Fork the project
2. Create your feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Create a Pull Request

---

## 📄 License
This project is licensed under the **MIT License**.

---

## 📩 Contact
For any queries, reach out via email: **praveenbarathi95@gmail.com**

**Happy Coding! 🎉**

