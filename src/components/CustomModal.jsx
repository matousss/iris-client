import Modal from 'react-modal'

export const CustomModal = props => {
    if (typeof (window) !== 'undefined') {
        Modal.setAppElement('body')
    }

    return <Modal className='
        flex flex-col absolute top-1/2 left-1/2 p-4
        transform -translate-x-1/2 -translate-y-1/2
        w-full h-full md:w-2/3 md:h-3/4 lg:w-1/2 lg:h-4/5
        md:border-2 border-ptext/20 outline-none md:rounded-2xl md:shadow-2xl bg-middle text-ptext
        '
                  style={
                      {
                          overlay: {
                              position: 'fixed',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundColor: 'rgba(var(--color-middle), .8)'
                          }
                      }
                  }

                  {...props}


    />
}