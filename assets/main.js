var solution_word = 'coley'

let word_input_cells = document.querySelectorAll(".word-input");
let curr_guess_num = 0;
let isGameEnd = false;

function word_input_cell_check(self, idx) {
    if(self.value.length > 1){
        let last_digit = self.value[self.value.length - 1];
        self.value = "" + last_digit;
    }

    if(self.value[0] < 'a' || self.value[0] > 'z')
        self.value = "";

    if(idx % 5 != 4 && self.value.length == 1)
        word_input_cells[idx + 1].focus();
}

for(let i = 0; i < word_input_cells.length; i++) {
    word_input_cells[i].addEventListener('keydown', (event) => {
        if (event.key === "Backspace" || event.key === "Delete") {
          if(i != 0 && word_input_cells[i].value == "")    word_input_cells[i - 1].focus();
          else word_input_cells[i].value = "";
        }
        // if(event.key === "ArrowRight" && i % 5 != 4)   
        //     word_input_cells[i + 1].focus();
        // if(event.key === "ArrowLeft" && i % 5 != 0)   
        //     word_input_cells[i - 1].focus();
        if(event.key === "Enter") {
            enter_btn_clicked();
        }
      });
    word_input_cells[i].setAttribute("oninput", "word_input_cell_check(this, " + i + ")");
}

function check_valid_word(curr_guess_num) {
    let start_word_cell = curr_guess_num * 5;
    let end_word_cell = (curr_guess_num + 1) * 5 - 1;
    for(let i = start_word_cell; i <= end_word_cell; i++) {
        if(word_input_cells[i].value == "")    
            return false;
    }
    return true;
}

function check_cell_correct_letter(thisCell, thisCellIndex) {
    thisCellLetter = thisCell.value;
    console.log(thisCellLetter);
    if(thisCellLetter == solution_word[thisCellIndex % 5])  return 2; // 2 neu chu nay o dung vi tri
    for(let i = 0; i < solution_word.length; i++) {
        if(thisCellLetter == solution_word[i])  return 1; // 1 neu chu nay co trong tu dap an nhung o sai vi tri
    }
    return 0; // 0 neu chu nay khong co trong tu dap an
}

function close_all_cell_input() {
    for(let i = 0; i < word_input_cells.length; i++) {
        word_input_cells[i].setAttribute("disabled", "");
    }
}


function enter_btn_clicked() {
    console.log("CLICKED!!!")
    if(isGameEnd)   return;
    if(!check_valid_word(curr_guess_num)) {
        console.log("Từ của bạn nhập vào không hợp lệ");
        return;
    }
        
    let start_word_cell = curr_guess_num * 5;
    let end_word_cell = (curr_guess_num + 1) * 5 - 1;
    let isGuessCorrect = true;
    for(let i = start_word_cell; i <= end_word_cell; i++) {
        if(check_cell_correct_letter(word_input_cells[i], i) < 2)   
            isGuessCorrect = false;
        if(check_cell_correct_letter(word_input_cells[i], i) == 2) {
            word_input_cells[i].classList.add("totally-correct-cell");
        }
        else if (check_cell_correct_letter(word_input_cells[i], i) == 1) {
            word_input_cells[i].classList.add("wrong-position-cell");
        }
        else {
            word_input_cells[i].classList.add("totally-wrong-cell");
        }
        word_input_cells[i].setAttribute("disabled", "");
    }

    if(curr_guess_num < 5) {
        word_input_cells[end_word_cell + 1].focus();
    }

    if(isGuessCorrect) {
        isGameEnd = true;
        alert("Game victory!!!");
        close_all_cell_input();
        return;
    }
    curr_guess_num++;
    if(curr_guess_num == 6) {
        alert("Game lost!!!\nThe answer is " + solution_word);
        return;
    }
}

function main() {
    console.log("Em yêu tất cả các anh!!")
}

main();