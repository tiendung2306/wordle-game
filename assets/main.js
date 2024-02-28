let word_input_cells = document.querySelectorAll(".word-input");

function word_input_cell_check(self) {
    if(self.value.length > 1){
        let last_digit = self.value[self.value.length - 1];
        self.value = "" + last_digit;

    }
    if(self.value[0] < 'a' || self.value[0] > 'z')
        self.value = "";
}

for(let i = 0; i < word_input_cells.length; i++) {
    word_input_cells[i].setAttribute("oninput", "word_input_cell_check(this)");
} 