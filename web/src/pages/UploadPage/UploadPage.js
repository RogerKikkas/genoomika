import MainLayout from 'src/layouts/MainLayout'
import UploadFile from 'src/components/UploadFile'

const UploadPage = () => {
  return (
    <MainLayout>
      <div className="mt-4 flex flex-col justify-center items-center">
        <UploadFile />
      </div>
    </MainLayout>
  )
}

export default UploadPage
