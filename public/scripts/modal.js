export default function Modal(){

    const cancelButton = document.querySelector('.button.cancel');
    const modalWrapper = document.querySelector('.modal-wrapper')

    cancelButton.addEventListener('click', close)

    function open(){
        modalWrapper.classList.add("active");
    }
    function close(){
        modalWrapper.classList.remove("active");
    }

    function toggle(){
        modalWrapper.classList.toggle('active')
    }

    function outsideModal(){
        modalWrapper.addEventListener('click', (event) => {
            if(event.target === modalWrapper){
                this.close();
            }
        })
    }



    return{
        open,
        close,
        outsideModal,
        toggle
    }
}
