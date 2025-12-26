let total = 0; // tổng điểm
let mouse_Live = -1; //Vị trí chuột đang ở
let clearIntervalId=-1; //khởi tạo giá trị trả về của interval random chuột
let time = 30; //khởi tạo thời gian đếm ngược
let level = 1000;
let name_Level = 1;


const items = document.querySelectorAll(".item");
let hienThiTong = document.getElementById("tong");
const get_Time = document.getElementById("time");
const get_Name_Level = document.getElementById("name_Level");


// const show_Mouse = () => {
//     //xóa không cho con chuột hiển thị lúc ban đầu
//     items.forEach((item)=>{
//         item.classList.remove("active")
//         item.classList.remove("bom")  
//     })
//     //random và add class active
//     mouse_Live = Math.floor(Math.random() * items.length);
//     items[mouse_Live].classList.add("active");
//     return mouse_Live;
// }

const show_Mouse = (count = 1) => {
    // 1. Xóa tất cả chuột cũ
    items.forEach((item) => {
        item.classList.remove("active");
        item.classList.remove("bom");
    });

    // 2. Tạo một mảng chứa các vị trí ngẫu nhiên không trùng nhau
    let selectedIndexes = [];
    while (selectedIndexes.length < count && selectedIndexes.length < items.length) {
        let randomIndex = Math.floor(Math.random() * items.length);
        if (!selectedIndexes.includes(randomIndex)) {
            selectedIndexes.push(randomIndex);
        }
    }

    // 3. Hiển thị chuột tại các vị trí đã chọn
    selectedIndexes.forEach(index => {
        items[index].classList.add("active");
    });
};

//Đập Chuột
//so sánh xem click có giống với mã số ô được random + lắng nghe click cộng trừ điểm
items.forEach((item, index)=>{
    item.addEventListener("click", () =>{
        if(time >=0 && item.classList.contains('active')){
             //đập trúng ẩn chuột trong lỗ đi
            items.forEach((item)=>{
                item.classList.remove("active") 
            })
            item.classList.add("bom")   
            total = total +10;
            hienThiTong.textContent = 'Tổng điểm:'+ total; 
        }
        else if(time >=0){
            total = total -5;
            total = (total<0) ? 0 : total;
            hienThiTong.textContent = 'Tổng điểm:'+ total;    
        }
        
    })
 })

let start = document.querySelector(".start");
let reset = document.querySelector(".reset")
//Bắt đầu chơi
    start.addEventListener("click", ()=>
    {
        total = 0;
        time =30;
        get_Name_Level.textContent = 'Level '+ name_Level;
        clearIntervalId = setInterval(() => {
            show_Mouse(name_Level);
        }, level);

        hienThiTong.textContent = 'Tổng điểm:'+ total;
//đếm ngược thời gian 
        const down_Time = setInterval(()=>{
            get_Time.textContent = time;
            time--;
            if(time<0){
                clearInterval(down_Time);
                clearInterval(clearIntervalId);
                get_Time.textContent = "Hết giờ";
                items.forEach((item)=>{
                    item.classList.remove("active")
                })
                if(total<100){
                    hienThiTong.textContent = 'Tổng điểm:'+ total +' Bạn đã thua' + ' Điểm phải >100'
                }
                else{
                    level = (level<=700) ? 700: level;
                    level = level -300;
                    name_Level++;
                    name_Level = (name_Level>3)? 1: name_Level++ ;
                    hienThiTong.textContent = 'Tổng điểm:'+ total +' Bạn đã thắng';
                }
            start.classList.remove("disabled");
            reset.classList.add("disabled");
                
            }
        }, 1000)
    start.classList.add("disabled");
    reset.classList.remove("disabled");
    },)

//reset game
    reset.addEventListener("click", ()=>{
        total=0;
        hienThiTong.textContent = 'Tổng điểm:'+ total;
        time=-1;
       
        clearInterval(clearIntervalId);
        items.forEach((item)=>{
            item.classList.remove("active")
        })
        start.classList.remove("disabled");
        reset.classList.add("disabled")
        
    })






