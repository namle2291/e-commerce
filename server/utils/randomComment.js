const mongoose = require("mongoose");
const User = require("../app/models/User");

async function randomComment(number) {
  let comments = [];
  let messages = [
    "Sản phẩm tốt",
    "Giao hàng đúng hạn",
    "Sản phẩm chất lượng cao",
    "Không có đánh giá",
    "Sản phẩm rất đẹp, đóng gói cẩn thận, giao hàng nhanh, phù hợp với giá tiền, không thể chê được, cho shop 100 * mọi người nên mua nhé",
    "Chất lượng sản phẩm tuyệt vời Đóng gói sản phẩm rất đẹp và chắc chắn Shop phục vụ rất tốt",
    "Hàng đẹp sop đóng gói cẩn thận mà giao nhanh",
    "Shop đóng gói cẩn thận, bao bì đi vào lòng người, sản phẩm đơn giản mà đẹp, đáng tiền mua =))",
  ];

  const response = await User.find();

  for (let i = 0; i < number; i++) {
    comments.push({
      star: Math.ceil(Math.random() * 5),
      postedBy: response[Math.floor(Math.random() * 2)]._id,
      comment: messages[Math.floor(Math.random() * messages.length)],
    });
  }

  return comments;
}

module.exports = randomComment;
