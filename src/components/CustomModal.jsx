import Modal from 'react-modal'

export const CustomModal = props => {
    if (typeof (window) !== 'undefined') {
        Modal.setAppElement('body')
    }

    return <Modal
        {...props}
        className={`
        flex flex-col p-4 m-auto
        relative top-1/2
        transition transform -translate-y-1/2 animate-slide-bottom
        md:border-2 border-ptext/20 outline-none md:rounded-2xl md:shadow-2xl bg-middle text-ptext 
        ` + props.className}
                  style={
                      {
                          overlay: {
                              position: 'fixed',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundColor: 'rgba(var(--color-middle), .4)',
                              backdropFilter: 'blur(4px)',
                          }
                      }
                  }




    />
}