// ****************** Declarations ************************************ //
let personalData = {
    userId: '',
    fullname: '',
    email: '',
    phone: '',
    gender: '',
    birthdate: '',
    city: '',
    address: '',
    passport: '',
    passportIssue: '',
    passportExpiry: '',
    studied: 'no',
    studiedCity: '',
    studiedUniversity: '',
    studiedMajor: ''
}

let familyData = {
    userId: '',
    fatherFname: '',
    fatherSname: '',
    fatherOccupation: '',
    fatherPhone: '',
    motherFname: '',
    motherSname: '',
    motherOccupation: '',
}


let edDatas = {
    userId: '',
    majors: [],
    documents: '[]'
}

let prDatas = {
    userId: '',
    posts: [],
    langCertif: '',
    documents: '[]',
    certifs: '[]'
}

let studyPlan = {
    userId: '',
    degree: '',
    major: '',
}

let edField = 2;
let prField = 2;

function parseURLParams(url) {
	var queryStart = url.indexOf("?") + 1,
	queryEnd   = url.indexOf("#") + 1 || url.length + 1,
	query = url.slice(queryStart, queryEnd - 1),
	pairs = query.replace(/\+/g, " ").split("&"),
	parms = {}, i, n, v, nv;	
	if (query === url || query === "") return;
	for (i = 0; i < pairs.length; i++) {
		nv = pairs[i].split("=", 2);
		n = decodeURIComponent(nv[0]);
		v = decodeURIComponent(nv[1]);
		if (!parms.hasOwnProperty(n)) parms[n] = [];
		parms[n].push(nv.length === 2 ? v : null);
	}
	return parms;
}

let param = parseURLParams(window.location.href);
personalData.userId = param.id[0];
familyData.userId = param.id[0];
edDatas.userId = param.id[0];
prDatas.userId = param.id[0];
studyPlan.userId = param.id[0];
// ****************************************************************

fetch('http://161.35.129.190/checkToken')
	.then(res => {
    	if (res.status === 200) {
			res.json().then(r => {
                console.log(r)
				if(r.id !== param.id[0])
                    window.location.href = ('http://161.35.129.190/login');
                fetch('http://161.35.129.190/api//user/' + r.id)
                .then(res => {
                    res.json()
                    .then(r => {
                        if(r.user.isApplied === 'true')
                        window.location.href = ('http://161.35.129.190/application?id=' + r.user._id);

                    })
                })
			});
		}
		else if (res.status === 401)
			window.location.href = ('http://161.35.129.190/login');
	})
	.catch(err => {
		console.error(err);
	});


const fullnameHandler = () => {
    personalData.fullname = $('input[id="fullname"]').val();
}

const emailHandler = () => {
    personalData.email = $('input[id="email"]').val();
}

const phoneHandler = () => {
    personalData.phone = $('input[id="phone"]').val();
}

const genderHandler = () => {
    personalData.gender = $('input[name="gender"]:checked').val();
}

const birthdateHandler = () => {
    personalData.birthdate = $('input[id="birthdate"]').val();
}

const cityHandler = () => {
    personalData.city = $('input[id="city"]').val();
}

const addressHandler = () => {
    personalData.address = $('input[id="address"]').val();
}

const passportHandler = () => {
    personalData.passport = $('input[id="passport"]').val();
}

const passportIssueHandler = () => {
    personalData.passportIssue = $('input[id="passport_issue"]').val();
}

const passportExpiryHandler = () => {
    personalData.passportExpiry = $('input[id="passport_expiry"]').val();
}

jQuery.each( [ "put", "delete" ], function( i, method ) {
    jQuery[ method ] = function( url, data, callback, type ) {
      if ( jQuery.isFunction( data ) ) {
        type = type || callback;
        callback = data;
        data = undefined;
      }
  
      return jQuery.ajax({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      });
    };
  });

$('#add_ed').click((event) => {
    event.preventDefault();
    console.log('#add_ed');
    $(`#ed_list${edField}`).html(`<div class="d-flex" id="ed-${++edField}">
        <input type="text" name="ed_from" class="form-control " minlength="2" placeholder="From *">
        <input type="text" name="ed_to" class="form-control " minlength="2" placeholder="To *">
        <input type="text" name="ed_institute" class="form-control " placeholder="Institute *">
        <input type="text" name="ed_degree" placeholder="Degree" class="">
        <input type="text" name="ed_major" class="form-control " minlength="2" placeholder="Major">
        </div>
    <div id='ed_list${edField}'></div>`);
})

$('#add_pr').click((event) => {
    event.preventDefault();
    console.log('#add_pr');
    $(`#pr_list${prField}`).html(`<div class="d-flex" id="pr-${++prField}">
        <input type="text" name="pr_from" class="form-control " minlength="2" placeholder="From *">
        <input type="text" name="pr_to" class="form-control " minlength="2" placeholder="To *">
        <input type="text" name="pr_institute" class="form-control " placeholder="Institute *">
        <input type="text" name="pr_department" placeholder="Department" class="">
        <input type="text" name="pr_post" class="form-control " minlength="2" placeholder="Post">
        </div>
    <div id='pr_list${prField}'></div>`);
})

/*$(".delete-button").click((event) => {
    event.preventDefault();
    console.log($("#w3s").attr("href"))
})

$(".delete-button").click(function(event){
    event.preventDefault();
    console.log($(this).attr("id"));
  });
*/
$('#submitButton-0').click(() => {
    console.log('test')
    fetch('http://161.35.129.190/api//personaldata/' + personalData.userId)
		.then(res => {
			if (res.status === 200) {
                $.put('http://161.35.129.190/api/personaldata/' + personalData.userId, personalData, (data, status) => {
                })
			}
			else if (res.status === 404)
                $.post('http://161.35.129.190/api/personaldata/', personalData, (data, status) => {
                })
        })
		.catch(err => {
			console.error(err);
		});
})

const fatherFnameHandler = () => {
    familyData.fatherFname = $('input[id="father_fname"]').val();
}

const fatherSnameHandler = () => {
    familyData.fatherSname = $('input[id="father_sname"]').val();
}

const fatherOccupationHandler = () => {
    familyData.fatherOccupation = $('input[id="father_occupation"]').val();
}

const fatherPhoneHandler = () => {
    familyData.fatherPhone = $('input[id="father_phone"]').val();
}

const motherFnameHandler = () => {
    familyData.motherFname = $('input[id="mother_fname"]').val();
}

const motherSnameHandler = () => {
    familyData.motherSname = $('input[id="mother_sname"]').val();
}

const motherOccupationHandler = () => {
    familyData.motherOccupation = $('input[id="mother_occupation"]').val();
}

const motherPhoneHandler = () => {
    familyData.motherPhone = $('input[id="mother_phone"]').val();
}


// ------------------------ ED/PR STUFF -------------------

$(document).ready(function(){
    $(".edForm").change(function(){
        const tmp = $(this).attr('id');
        let id = tmp[tmp.indexOf("-") + 1];
        let data = {}
        data.edFrom = $(`#${tmp}`).children('input[name="ed_from"]').val();
        data.edTo = $(`#${tmp}`).children('input[name="ed_to"]').val();
        data.edInstitute = $(`#${tmp}`).children('input[name="ed_institute"]').val();
        data.edDegree = $(`#${tmp}`).children('input[name="ed_degree"]').val();
        data.edMajor = $(`#${tmp}`).children('input[name="ed_major"]').val();
        if (edDatas.majors.length <= +id)
            edDatas.majors.push(data);
        else
            edDatas.majors[+id] = data;
        console.log(edDatas);
    });
    $(".prForm").change(function(){
        const tmp = $(this).attr('id');
        let id = tmp[tmp.indexOf("-") + 1];
        let data = {}
        data.prFrom = $(`#${tmp}`).children('input[name="pr_from"]').val();
        data.prTo = $(`#${tmp}`).children('input[name="pr_to"]').val();
        data.prInstitute = $(`#${tmp}`).children('input[name="pr_institute"]').val();
        data.prDepartment = $(`#${tmp}`).children('input[name="pr_department"]').val();
        data.prPost = $(`#${tmp}`).children('input[name="pr_post"]').val();
        if (prDatas.posts.length <= +id)
            prDatas.posts.push(data);
        else
            prDatas.posts[+id] = data;
        console.log(prDatas);
    });
});
