import { faEnvelope, faPhoneFlip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ContactPage = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center px-6 py-4">
        <p className="text-gray-500 text-sm">
          Home / <span className="text-gray-700 font-semibold">Contact</span>
        </p>
      </div>
      <div className="flex gap-6">
        <div className="w-1/3 bg-white p-6  rounded-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-red-400 text-white w-12 h-12 flex items-center justify-center rounded-full shrink-0">
            <FontAwesomeIcon icon={faPhoneFlip} className="text-xl"/>
            </div>
            <div>
              <h3 className="text-gray-700 font-semibold">Call To Us</h3>
              <p className="text-gray-500 text-sm">
                We are available 24/7, 7 days a week.
              </p>
              <p className="text-gray-700 mt-1">Phone: +880161112222</p>
            </div>
          </div>
          <hr />
          <div className="flex items-center gap-4 mt-6">
            <div className="bg-red-400 text-white w-12 h-12 flex items-center justify-center rounded-full shrink-0">
            <FontAwesomeIcon icon={faEnvelope}  className="text-xl"/>
            </div>
            <div>
              <h3 className="text-gray-700 font-semibold">Write To Us</h3>
              <p className="text-gray-500 text-sm">
                Fill out our form and we will contact you within 24 hours.
              </p>
              <p className="text-gray-700 mt-1">
                Emails: customer@exclusive.com
              </p>
              <p className="text-gray-700">Emails: support@exclusive.com</p>
            </div>
          </div>
        </div>
        <div className="w-2/3 bg-white p-6 rounded-lg">
          <form>
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none "
              />
              <input
                type="email"
                placeholder="Your Email *"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none "
              />
              <input
                type="text"
                placeholder="Your Phone *"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none "
              />
            </div>
            <div className="mt-4">
              <textarea
                placeholder="Your Message"
                className="w-full h-32 px-4 py-2 bg-gray-200 rounded-md focus:outline-none "
              ></textarea>
            </div>
            <div className="mt-4 text-right">
              <button
                type="submit"
                className="px-6 py-2 bg-red-400 text-white rounded-md hover:bg-red-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
