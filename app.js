const progress = document.getElementById("progress");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const circles = document.querySelectorAll(".circle");
const HorizontalCircles = document.querySelectorAll(".circle.horizontal");
const VerticalCircle = document.querySelector(".circle.vertical");
const VerticalProgress = document.getElementById("vertical");
const RtlCircle = document.querySelector(".circle.rtl");
const RtlProgress = document.getElementById("rtl");

let currentActive = 1;

const HIDDEN_CLASS = "hidden";

//next 버튼 클릭 이벤트
next.addEventListener("click", () => {
    currentActive++;
    //현재 액티브 단계 늘림
    if (currentActive > circles.length) {
        currentActive = circles.length;
    }

    if (currentActive > 4) {
        removeHidden();
        update();
    } else {
        update();
    }
    console.log(currentActive);
});

//prev 버튼 클릭 이벤트
prev.addEventListener("click", () => {
    currentActive--;
    //현재 액티브 단계 줄임
    if (currentActive < 1) {
        currentActive = 1;
    }

    if (currentActive >= 4) {
        activeHidden();
        update();
    } else {
        update();
    }
    
})


//4단계 이상일 때 "Next" 버튼 클릭 시 하나씩 Hidden 제거
function removeHidden() {
    circles.forEach((circle, idx) => {
        //4단계 이상일 시 하나씩 hidden 제거
        const isHidden = circle.classList.contains(HIDDEN_CLASS);

        if (idx < currentActive && isHidden) {
            circle.classList.remove(HIDDEN_CLASS);
        }

        //5단계일 때 Vertical circle Active 전환
        if (currentActive === 5) {
            VerticalProgress.style.height = "100%"
            VerticalCircle.classList.add("active");            
        }
    })
}

//4단계 이상일 때 "Prev" 버튼 클릭 시 하나씩 Hidden 추가
function activeHidden() {
    circles.forEach((circle, idx) => {
        //4단계 이상일 시 하나씩 hidden 제거
        const isHidden = circle.classList.contains(HIDDEN_CLASS);

        if (idx >= currentActive && !isHidden) {
            circle.classList.add(HIDDEN_CLASS);
        }

        //4단계일 때 Vertical Circle Active 삭제
        if (currentActive === 4) {
            VerticalProgress.style.height = "0%"
            VerticalCircle.classList.remove("active");            
        }
    })
}

//버튼 클릭에 따른 현재 진행상황 업데이트 함수
function update() {
    HorizontalCircles.forEach((circle, idx) => {
        //다음 단계로 진행 시 다음단계 써클 활성화
        if (idx < currentActive) {
            circle.classList.add("active");
        }
        else {      //이전 단계로 돌아갈 시 현재 단계 써클 비활성화
            circle.classList.remove("active");
        }
    });

    const actives = document.querySelectorAll(".horizontal.active");

    //현재 진행 단계에 맞춰 진행 바 색상 변경
    progress.style.width = ((actives.length - 1) / (HorizontalCircles.length - 1)) * 100 + "%";
    

    //진행 단계에 따라 Prev/Next 버튼 활성화 or 비활성화
    if (currentActive === 1) {
        prev.disabled = true;
    } else if (currentActive === circles.length) {
        next.disabled = true;
    } else {
        prev.disabled = false;
        next.disabled = false;
    }
}