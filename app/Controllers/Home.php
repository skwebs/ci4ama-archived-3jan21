<?php namespace App\Controllers;

use CodeIgniter\Controller;

class Home extends Controller
{
    
	public function index()
	{
	    echo view('home_section/layouts/header');
	    echo view('home_section/pages/home');
	    echo view('home_section/layouts/footer');
	}
    
    public function welcome()
    {
        return view('welcome_message');
    }

    
	public function page($page = 'home')
	{
	    if ( ! is_file(APPPATH.'/Views/main_pages/'.$page.'.php'))
	    {
	        // Whoops, we don't have a page for that!
	        throw new \CodeIgniter\Exceptions\PageNotFoundException($page);
	    }
	
	    $data['title'] = ucfirst($page); // Capitalize the first letter
	
	    echo view('home_section/layouts/header', $data);
	    echo view('home_section/pages/'.$page, $data);
	    echo view('home_section/layouts/footer', $data);
	}
}