const BACK_END_URL =
  "https://port-0-cloudtype-test-nx562olfgskv6d.sel3.cloudtype.app";

document.addEventListener("DOMContentLoaded", async () => {
  // 테이블에 들어갈 데이터를 불러온다.
  const response = await axios.get(`${BACK_END_URL}/cust`);
  const custs = response.data;

  // 데이터 삽입 이벤트 대기
  document.getElementById("insert-btn").addEventListener("click", insertCust);

  // 테이블 보이기
  viewTable(custs);
});

// 데이터를 이용하여 테이블 구성
function viewTable(custs) {
  for (cust of custs) {
    const custTable = document.getElementById("cust-table");

    const tr = document.createElement("tr");
    tr.id = cust.guestCode;

    for (item in cust) {
      const td = document.createElement("td");
      td.textContent = cust[item];
      tr.appendChild(td);
    }

    appendButton(tr);

    custTable.appendChild(tr);
  }
}

// 수정과 삭제버튼 만들기
function appendButton(tr) {
  const editBtn = document.createElement("button");
  editBtn.textContent = "수정";
  editBtn.id = cust.guestCode;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "삭제";
  deleteBtn.id = cust.guestCode;

  tr.appendChild(editBtn);
  tr.appendChild(deleteBtn);

  // 로우 수정, 삭제 이벤트 대기
  editBtn.addEventListener("click", editCust);
  deleteBtn.addEventListener("click", deleteCust);
}

// 해당 로우 수정
function editCust() {
  try {
    let custs = [];

    // 각 필드의 속성을 이용하여 편집가능한 상태로 만들기
    for (let i = 1; i < 6; ++i) {
      const td = document.getElementById(this.id).childNodes[i];

      td.contentEditable = "true";
      custs.push(td);
    }

    // 버튼 이름 변경
    this.textContent = "확인";

    this.addEventListener("click", () => {
      const [guestName, guestBirth, guestHp, guestAddr, guestMail] = custs.map(
        (cust) => {
          cust.contentEditable = "false";
          return cust.textContent;
        }
      );

      const body = {
        guestName,
        guestBirth,
        guestHp,
        guestAddr,
        guestMail,
      };

      // 데이터 수정 API 호출
      axios
        .put(`${BACK_END_URL}/cust/${this.id}`, body)
        .then()
        .catch((e) => {
          console.error(e);
          alert("데이터 형식에 맞게 수정해주세요.");
        })
        .finally(() => {
          // 페이지 새로고침
          window.location.reload();
        });
    });
  } catch (err) {
    console.log(err);
  }
}

// 해당 로우 삭제
async function deleteCust() {
  try {
    // 데이터 삭제 API 호출
    await axios.delete(`${BACK_END_URL}/cust/${this.id}`);

    // 페이지 새로고침
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}

// 데이터 삽입
async function insertCust() {
  const pathInput = document.getElementById("path-input");

  try {
    // input에 입력된 path로 데이터 삽입 API 호출
    await axios.post(`${BACK_END_URL}/cust`, {
      path: pathInput.value,
    });
  } catch (err) {
    alert("데이터를 읽을 수 없습니다.");
  }

  // 페이지 새로고침
  window.location.reload();
}
