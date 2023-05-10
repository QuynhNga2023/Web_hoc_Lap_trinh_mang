// creating an array and passing the number, questions, options, and answers
let questions = [
  {
    numb: 1,
    question: "Thiết bị hub thông thường nằm ở tầng nào của mô hình OSI",
    answer: "Tầng 1",
    options: [
      "Tầng 1",
      "Tầng 2",
      "Tầng 3",
      "Tầng 4"
    ]
  },
  {
    numb: 2,
    question: "Thiết bị Switch thông thường nằm ở tầng nào của mô hình OSI?",
    answer: "Tầng 2",
    options: [
      "Tầng 1",
      "Tầng 2",
      "Tầng 3",
      "Tầng 4"
    ]
  },
  {
    numb: 3,
    question: "Thiết bị Bridge nằm ở tầng nào của mô hình OSI?",
    answer: "Tầng 2",
    options: [
      "Tầng 1",
      "Tầng 2",
      "Tầng 3",
      "Tầng 4"
    ]
  },
  {
    numb: 4,
    question: "Trong cùng một máy, có nhiều ứng dụng mạng cùng chạy, để phân biệt các ứng dụng này với nhau người ta thường dùng thông số nào sau đây?",
    answer: "Port",
    options: [
      "Port",
      "Địa chỉ IP",
      "Tên miền",
      "Tất cả đều sai"
    ]
  },
  {
    numb: 5,
    question: "Phương thức nào của đối tượng thuộc lớp ServerSocket lắng nghe kết nối từ client?",
    answer: "accept()",
    options: [
      "listen()",
      "wait()",
      "accept()",
      "listening()"
    ]
  },
  // you can uncomment the below codes and make duplicate as more as you want to add question
  // but remember you need to give the numb value serialize like 1,2,3,5,6,7,8,9.....

  {
    numb: 6,
    question: "Lớp nào sau đây KHÔNG sử dụng trong ứng dụng giao tiếp mạng Socket dùng giao thức UDP?",
    answer: "Socket",
    options: [
      "DatagramSocket",
      "DatagramPacket",
      "Socket",
      "InetAddress"
    ]
  },

  {
    numb: 7,
    question: "TCP được viết tắt bởi từ ?",
    answer: "Transmission Control Protocol",
    options: [
      "Transport Control Protocol",
      "Transport Control Processing",
      "Transmission Control Processing",
      "Transmission Control Protocol"
    ]
  },

  {
    numb: 8,
    question: "Trong lập trình TCP, Client muốn tạo Socket để kết nối đến Server ở địa chỉ 192.168.13.26:8088, thì sử dụng câu lệnh nào sau đây?",
    answer: "Socket('192.168.13.26',8088)",
    options: [
      "ServerSocket(8088)",
      "ServerSocket('192.168.13.26',8088)",
      "Socket('192.168.13.26',8088)",
      "Socket(8088)"
    ]
  },

  {
    numb: 9,
    question: "Trong lập trình Socket UDP, gói dữ liệu gửi từ Server về Client ngoài dữ liệu gửi cần phải có thêm thông tin gì?",
    answer: "Địa chỉ IP và Port của Client",
    options: [
      "Địa Chỉ IP",
      "Port của Client",
      "Địa chỉ IP và Port của Client",
      "Không cần thêm gì cả"
    ]
  },

  {
    numb: 10,
    question: "Trong lập trình UDP, Server muốn tạo một DatagramSocket để cho phép Client kết nối. Ta sử dụng câu lệnh nào sau đây?",
    answer: "DatagramSocket(1234)",
    options: [
      "DatagramSocket()",
      "DatagramSocket(1234)",
      "DatagramSocket('localhost')",
      "DatagramSocket('localhost',1234)"
    ]
  },
];