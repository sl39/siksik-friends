"use client";

import { useState } from "react";
import styles from "./game.module.scss";

export default function Chatting() {
  // const [chatLog, setChatLog] = useState();

  const chatLog = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti animi cupiditate facilis iure possimus itaque placeat suscipit, perspiciatis, delectus alias velit cumque. Facere laboriosam repellendus accusamus voluptatum? Quas, quo nobis.
  Saepe eaque ut magnam vero? Ad consequuntur molestiae inventore eos? Accusantium saepe nam facilis a assumenda reprehenderit, itaque voluptate earum. Laboriosam dolorum est quas omnis repellat veniam, veritatis laborum repellendus.
  Ducimus hic sequi animi, ex, adipisci, sit excepturi maiores tempore tempora minus modi dolore! Non veritatis, ducimus sint impedit consectetur possimus obcaecati dolores tenetur assumenda facere officiis nulla nisi architecto!
  Hic quaerat optio recusandae dignissimos ipsum nobis asperiores, saepe aperiam dolores voluptatum culpa repudiandae ullam perspiciatis porro fugit minus repellat dicta rerum quo id, maiores quisquam? Ipsum, labore. Cupiditate, culpa.
  Eum impedit accusantium fuga voluptatem facilis soluta, aspernatur dicta modi commodi velit explicabo laudantium ex! Dolorum temporibus sunt cupiditate, molestias, autem culpa nihil vitae beatae alias placeat possimus, quo pariatur!
  Aliquam cumque incidunt eum quibusdam sapiente quas quam, hic, sequi pariatur nisi voluptatibus! Reiciendis quisquam ea labore, aut non sed reprehenderit repudiandae eius deleniti illo ab quidem aliquid quod officia.
  Quas nostrum voluptates obcaecati, odit soluta esse asperiores doloremque nam corporis! Cumque voluptate temporibus aspernatur error corrupti id, quaerat ullam tenetur earum ratione possimus dolor aperiam quidem velit molestias aliquid!
  Quam quaerat totam, ex atque recusandae ab, natus voluptatem ipsam eos enim nihil dignissimos omnis rem facere illum? Dignissimos libero repudiandae voluptatibus a natus eaque est, aliquid optio ipsa rerum!
  Ut error exercitationem nesciunt molestias sint natus? Earum itaque explicabo illo rerum porro modi atque, voluptatem quis praesentium cupiditate? Beatae aliquid saepe consectetur cupiditate accusamus esse iure incidunt fugit deleniti!
  Quisquam amet culpa veritatis laboriosam ea magnam modi, atque cupiditate eveniet expedita ipsam exercitationem aut libero! Deserunt incidunt in exercitationem labore voluptatibus eum et quidem, molestiae dolor repellendus ut tempora.
  Quia, aspernatur, quod ducimus modi nemo earum, deserunt non adipisci sit pariatur similique unde! Rerum similique harum, quidem optio quo labore. At facilis voluptatum aliquid mollitia necessitatibus non amet consectetur.
  Fugit officiis incidunt placeat quia velit eum repellat enim ipsum ullam earum blanditiis ratione, animi maxime, dolor in eos ipsa aut sequi veritatis mollitia. Facilis ea ullam animi dolorem dolor?
  Incidunt, laboriosam architecto laudantium culpa dolorum obcaecati similique quidem ducimus non ullam officiis? Est quasi quia ipsam? Pariatur numquam aspernatur maiores natus illum et dolores quibusdam voluptatum debitis, asperiores quos.
  Deserunt quo officiis odio soluta. Ab, quasi eligendi cumque possimus porro et corrupti est, aspernatur neque, fugit esse officiis in dolorem eveniet unde nostrum. Assumenda tempora atque molestiae ratione laudantium.
  Nemo facere officiis animi esse cupiditate! Explicabo aut nostrum, illo ullam ad repudiandae rem? Temporibus maiores est amet eum doloremque eaque vitae deserunt hic quisquam nobis. Quam sit voluptatibus maiores.
  Commodi debitis aut quisquam. Necessitatibus vero pariatur temporibus iusto. Fugiat exercitationem placeat aliquid consequatur eos et. Dicta blanditiis praesentium officiis non laboriosam, voluptatibus, enim ea adipisci, dolor inventore mollitia eveniet.
  Accusantium, sunt veniam. Est explicabo totam nemo! Rem consequatur quo aspernatur quos magni repudiandae voluptas numquam nemo cupiditate nulla minima fuga provident necessitatibus, fugiat aut velit, debitis fugit asperiores neque!
  Veritatis nulla vero tempore voluptates quos inventore reprehenderit magnam animi, delectus, molestias, commodi nisi culpa optio voluptatem eaque rerum quia eum. Qui impedit, accusantium iste illum ipsum velit ipsam aut!
  Ad, quisquam est! Sint amet porro impedit. Officiis inventore nostrum provident hic blanditiis libero neque eum ratione? Perspiciatis voluptatem at esse sunt. Quod maxime sequi suscipit, asperiores similique tenetur necessitatibus.
  Saepe, quod? Laborum sed eum eius autem optio facilis mollitia amet possimus officia rerum omnis, voluptate libero quas expedita et tempora vel voluptatum. Quas voluptatibus corporis natus explicabo quod voluptatem.
  Corrupti, explicabo autem, libero repellendus voluptates ex dolore vero dolorem velit aspernatur expedita porro natus deleniti nam beatae quae itaque sapiente consequuntur sed quaerat eaque quia enim! Ipsam, earum esse?
  Optio reiciendis quam vero, consequatur maxime itaque, veritatis consectetur nobis esse laborum ratione. Tempore perferendis repellendus veniam repudiandae neque laborum numquam ex quisquam deserunt facere molestiae, fugit explicabo error reiciendis!
  Aperiam magni quibusdam, vero ipsam voluptate nemo nobis consectetur? Deserunt dolorum quae placeat esse in nulla reprehenderit consectetur quasi saepe unde. Eum ullam doloribus sed eius, odit suscipit error rem.
  Quod nam earum vero veritatis laudantium natus expedita? Voluptatibus maiores facilis laboriosam sint magni consectetur, corrupti ut fugiat mollitia rerum assumenda quaerat ab id, velit recusandae eveniet! Dolor, ducimus eveniet!
  Non, nostrum rerum. Qui praesentium modi esse odio repudiandae eveniet? Dolor ab exercitationem similique dicta nihil nobis commodi provident nisi molestias, natus, molestiae quia eius facere, ex sed doloremque sequi.
  Id dolorum maiores consequatur accusamus, iste odio deserunt sit beatae? Aliquam voluptatibus laborum nulla dolore, voluptate officia modi sequi molestiae nesciunt libero esse nisi alias possimus dicta, ducimus quisquam tempora!
  Quidem dolore rerum repudiandae temporibus laudantium nobis, dolores, magni doloremque ullam cum libero distinctio, dolorum vel voluptates commodi praesentium. Similique autem molestiae vero veniam illum voluptate vitae odio quidem eos!
  Ullam aliquam esse corrupti est. Dolorem repudiandae, ab voluptatum voluptate dolor impedit, earum provident fugit tenetur velit minus illum! Repellendus provident quaerat soluta cumque in sunt, vero praesentium alias sint.
  Iure numquam inventore itaque autem amet. Sint explicabo, aut quibusdam exercitationem obcaecati praesentium non, quis modi ut cumque cupiditate natus doloribus unde deserunt amet corrupti earum blanditiis consequatur! Sint, voluptas.
  Mollitia delectus similique neque repellendus corporis? Odit, eveniet, voluptas cupiditate quibusdam quae hic enim eius maiores consequatur assumenda ea molestias explicabo itaque est omnis, corrupti unde ipsa! Libero, modi assumenda.
  Inventore asperiores quae ab tempore eaque! Accusamus optio harum voluptatem maiores nostrum eveniet aperiam reprehenderit sit quae sunt! Veritatis nesciunt autem laudantium, modi mollitia dignissimos officiis maiores vel quis officia.
  Doloribus corrupti quas, deleniti eveniet impedit dolorem. Nisi, dolor mollitia cupiditate assumenda voluptatum, cum nesciunt exercitationem ad veritatis aperiam dignissimos molestiae libero suscipit quod laboriosam quas. Tempore harum quisquam id.
  Cum aut voluptatem voluptate, excepturi exercitationem ullam nulla ex quis corporis at officiis magnam consequatur! Aperiam sed similique, facilis commodi eos nemo accusantium doloribus rem, natus, voluptates fugit dolores reprehenderit.
  Quae, cumque fuga vitae velit dicta nisi minus possimus molestias, eos maxime rem repellendus amet animi est, pariatur quis hic. Cumque, officia quod? Harum neque culpa in! Delectus, voluptatum consequuntur.
  Libero iure consequuntur accusamus? Quis earum fugit itaque consectetur facere laborum nesciunt? Ducimus eveniet ipsum, eius fugiat minima id ratione ad debitis vitae veniam assumenda officiis quisquam sed nemo vel?
  Voluptates, explicabo? Facere sint voluptatum temporibus dolorem corrupti molestiae velit! Soluta sunt iusto id in quo assumenda corrupti voluptate voluptatibus accusantium, tenetur fuga incidunt, similique facilis minus nihil minima asperiores.
  Placeat explicabo libero atque tenetur dolores officiis fugit porro repellendus magnam ut, iure beatae magni! Placeat quae corrupti deserunt! Dignissimos debitis eos consectetur fuga reprehenderit, pariatur nisi repellat ducimus amet?
  Eius tenetur iste earum, obcaecati non quasi eum, exercitationem, nesciunt quo dolores ab amet ipsam. Tenetur ut esse fugiat libero vitae repudiandae. Corrupti placeat ex impedit modi magni reprehenderit laudantium!
  Ex voluptates ipsam quos magni earum nihil, quod nam, provident a similique aliquam deserunt repellat mollitia nobis quisquam, quo eaque? Aperiam delectus qui repellendus nostrum! Ducimus perspiciatis amet provident soluta.
  Nemo distinctio hic impedit soluta magni cum iusto quo, veritatis totam doloremque rerum maxime laudantium ratione vel harum. Rem expedita nihil dolores cupiditate quo, eius totam quibusdam. Nesciunt, debitis possimus?
  Neque rem itaque officia? Quas quibusdam atque quidem officiis inventore blanditiis temporibus tempora voluptate delectus reiciendis. Incidunt quibusdam laudantium in corrupti! Officiis ab iusto ea delectus mollitia libero ipsa repellendus?
  Accusantium quaerat, inventore hic, dolorum quibusdam neque sequi, ad sed soluta aut labore in omnis voluptate corporis? Culpa eaque deserunt sit sunt, eligendi ipsam quaerat itaque non dolore libero facilis?
  Cupiditate, quia? Expedita pariatur iste aperiam inventore illo perferendis aut possimus sint provident harum quasi obcaecati facilis similique nulla delectus, ut cum quidem doloribus, exercitationem dolorum sunt corporis, nostrum suscipit.
  Quas, molestias labore earum adipisci expedita tempora in omnis eius mollitia? Ea corrupti necessitatibus est inventore non, similique illum nulla quis distinctio. Iste magni et sint molestias numquam laudantium. Nulla.
  Voluptate quas reiciendis unde dolore, quibusdam harum quos ab quis hic, recusandae inventore eius blanditiis ducimus eveniet id dolorem? Dolorum velit facilis aut veniam quis nulla, alias magnam soluta cumque.
  Cupiditate velit necessitatibus omnis, alias nam id quas corporis, optio a enim perspiciatis minus atque nesciunt, iure architecto sit fugit. At sequi consectetur officia voluptatum odit tempore iusto qui enim!
  Sapiente tempora reprehenderit ratione ea veritatis modi eveniet cumque dolorem, ducimus quam nihil! At quibusdam perferendis odio nostrum similique natus, est officiis corrupti totam cupiditate eos, inventore omnis laudantium. Omnis.
  Distinctio vitae consectetur quas magnam. Vero, aperiam pariatur. Aut illo quas laudantium sequi voluptates eos eius unde ullam ipsum nihil quasi deserunt, sit nulla, laborum sint consectetur consequuntur officiis fugit.
  Facilis consequatur numquam id sed! Fugiat unde delectus deleniti exercitationem optio animi at eos provident maxime. Deserunt illum maiores pariatur? Dolore nihil, rerum itaque neque provident dolorum? Ullam, obcaecati doloribus.
  Dicta, recusandae? Corporis ea asperiores quam animi voluptatem iste vero dignissimos totam officia debitis deleniti consequatur rem sint, ab possimus commodi? Provident accusantium a eligendi necessitatibus nostrum, rem voluptatum in.
  Laudantium obcaecati soluta doloribus nobis doloremque, blanditiis dolorem, provident omnis ut, fuga eveniet dolore mollitia reiciendis. Consectetur, quas cupiditate aliquid facilis ipsam exercitationem unde earum laborum, odio delectus deserunt similique.
  Similique dignissimos nisi veritatis molestias aliquam alias, voluptatum recusandae doloremque voluptate neque asperiores modi? Reprehenderit quia facilis expedita, adipisci distinctio sequi ex quo modi consequatur architecto enim quibusdam necessitatibus repellat!
  Rem, iusto ipsam nam, illo sint porro dignissimos autem, repudiandae animi cupiditate aspernatur temporibus reiciendis culpa magni odit vero omnis sed? Adipisci debitis unde cum sequi dolor laborum ipsum alias?
  Architecto vel possimus quibusdam cupiditate distinctio adipisci corrupti, molestias atque illum officiis maiores eius soluta error excepturi sint dolor totam illo nisi? Voluptatem explicabo ad eos et inventore velit distinctio.
  Quaerat, accusamus similique quisquam odit ipsum quibusdam ad odio officia, velit obcaecati non error asperiores aut id! Vel, provident totam quas dignissimos laboriosam nihil iure itaque ut tempore, pariatur sit!
  Facere mollitia et esse earum porro ex minus! Aut sapiente labore soluta eum minus voluptas cumque eius quo commodi architecto, reiciendis sunt deserunt eligendi exercitationem velit quasi sit ducimus impedit?
  Eius, id commodi! Dicta aut illum reiciendis dolorem, suscipit iste quasi distinctio magni ratione omnis totam! Impedit, ipsum. Deserunt voluptates neque omnis magnam ad? Sint quia magnam doloremque quaerat est!
  Minus voluptatibus ut repellat? Modi voluptates quidem ipsum sunt quas harum officiis praesentium quam enim, beatae illo voluptate aspernatur perspiciatis, eum laborum vel ab corporis quaerat veritatis, accusamus a quae.
  Accusamus dignissimos fugit dolores cupiditate earum incidunt, dolorem fuga fugiat exercitationem id non quo architecto voluptate. Quia quos est possimus soluta perferendis impedit tempore, iste eum non harum laboriosam ad.
  Molestias consequuntur consectetur id consequatur voluptas molestiae dolore debitis? Voluptatem assumenda, similique itaque voluptatum voluptas quas cumque quam ad delectus commodi beatae officiis iure minus suscipit soluta iste! Quam, cum.
  Blanditiis necessitatibus, explicabo beatae tempore error asperiores voluptatum eaque culpa esse quasi impedit sed mollitia et in quod magni incidunt est placeat reiciendis excepturi quae! Est dolore expedita molestias neque?
  Esse corrupti ipsum magni amet, placeat animi, nihil quasi repellat ut quos alias perferendis assumenda cum fugiat veritatis deleniti dolor sequi consequuntur possimus quibusdam rerum eveniet quas non. Delectus, unde.
  Blanditiis ratione voluptas id cupiditate officia natus corrupti temporibus neque voluptate at, sit aliquid laborum illum mollitia ipsum? Itaque recusandae soluta suscipit culpa esse assumenda asperiores eaque necessitatibus quam laudantium.
  Nisi unde est reiciendis et iure voluptate itaque libero deleniti suscipit eum aspernatur neque velit, minus accusantium vitae commodi optio laboriosam, ducimus nemo officiis mollitia praesentium! Cum saepe praesentium quas?
  A eligendi ut nobis odio recusandae eius reprehenderit possimus deserunt repellendus commodi quos delectus, labore fuga dignissimos. Laudantium, tenetur, ullam dolores, dignissimos nemo tempora nobis facere magnam odit quo dolor.
  Nesciunt iste eaque tenetur voluptatibus repellendus voluptatum, voluptas quos modi, doloremque ea blanditiis tempore eum suscipit laudantium asperiores necessitatibus dicta. Dolorum alias atque molestiae, mollitia maiores ex rem dignissimos quibusdam.
  Expedita cum neque veniam ea magni nisi velit maiores exercitationem esse, saepe laudantium facilis illum obcaecati pariatur asperiores cumque corporis! Ex commodi explicabo impedit inventore deserunt consectetur nihil perspiciatis eveniet!
  Distinctio ea voluptates fugiat corrupti necessitatibus earum quos ex rerum, dignissimos dolor ipsa iste numquam illum, obcaecati veniam cumque quibusdam culpa hic! Itaque libero voluptatum ratione facere veritatis eveniet magnam!
  Dolores ut ducimus eaque animi minus, laborum a repellat ipsa nihil debitis magni ratione illo quae quis rerum ullam impedit adipisci quas commodi, exercitationem dolore excepturi? Exercitationem rerum voluptas ad?
  Cumque voluptatem pariatur dicta consequatur id? In consequatur molestiae repudiandae, delectus sint exercitationem animi eius. Voluptas maxime laboriosam ex placeat, doloremque ut ipsam deleniti itaque perspiciatis molestiae sed corporis aliquam.
  Pariatur laborum officia dolor odit accusantium ratione architecto animi vero totam dicta qui nulla, provident eligendi in consequatur maiores rerum iste, rem iusto debitis nihil praesentium. Voluptatibus quo doloribus sunt.
  Quos asperiores, laboriosam unde ratione rerum ea sint cumque dolore officia voluptatum iusto quod explicabo dicta aliquam deleniti atque ipsa labore quia tempora deserunt! Error deserunt natus voluptate officia nobis!
  Mollitia dolor, hic vero impedit officiis molestias? Officia, veniam recusandae, obcaecati cum iste numquam voluptates ratione quaerat, commodi maxime delectus similique quidem. Delectus consequatur asperiores corporis omnis, optio praesentium accusamus!
  Culpa, tenetur. Neque illum alias soluta eveniet. Sequi provident quaerat numquam cupiditate error, sed fugit sint aspernatur? Blanditiis, accusamus, magni velit reiciendis laborum quas sint atque, ratione consectetur tempora ab.
  Neque iure consequuntur fugit, illo dolorem laboriosam quis, dolore necessitatibus minima esse facilis excepturi nihil voluptates! Quod ipsa voluptates perspiciatis, id numquam officiis quia voluptatem repudiandae temporibus assumenda dolorum corporis?
  Asperiores expedita deserunt iusto, qui, doloremque dolore maxime corrupti quaerat sed sequi omnis quos quisquam laudantium eligendi reiciendis sit quasi voluptatem eius sint temporibus necessitatibus porro! Sunt repellat quam mollitia!
  Quas, voluptatum qui hic cumque ex omnis atque accusamus est dolorum animi necessitatibus doloribus voluptates repellendus vitae distinctio ratione molestiae eligendi nihil porro optio. Quibusdam, tenetur? Assumenda possimus earum molestiae.
  Consectetur odit inventore natus excepturi pariatur ab iure eum? Nam non architecto consequatur id, sed, veniam earum quidem incidunt aliquam voluptatem quae aperiam molestias ipsam illo temporibus facere itaque vitae.
  Incidunt quaerat esse atque vero in dolorem velit maxime voluptate assumenda et, totam soluta nesciunt. Maxime quod recusandae dolorem unde magnam mollitia, ab quae est doloremque cum tempore ipsa explicabo!
  Recusandae aperiam, alias voluptas excepturi consectetur sit esse facere laboriosam, similique officiis dolores, ullam ducimus illo et explicabo fugit dignissimos nesciunt magnam ipsa corrupti eligendi quisquam molestiae ipsum. Sunt, eveniet.
  Laborum ullam ea id repudiandae maiores enim temporibus deleniti perferendis eaque, deserunt quibusdam numquam expedita illum facilis vel assumenda quas, eum, ut nisi excepturi corporis reprehenderit exercitationem. Corrupti, a consectetur!
  Mollitia accusantium asperiores aliquam debitis, odio sint molestiae optio dolore autem esse. Commodi assumenda nobis illo corporis consequuntur consequatur. Consequuntur deleniti blanditiis neque suscipit numquam dolores sit ex eveniet qui!
  Doloribus mollitia, iusto sint voluptatibus optio consequuntur eveniet deserunt ad a hic ipsa asperiores voluptatem culpa soluta esse quibusdam. Rerum suscipit fugit minus ex eaque aperiam dolor quidem ipsam eum.
  Veritatis, quisquam delectus. Excepturi, quam ullam ex nulla necessitatibus laborum, accusamus quis doloremque ducimus repellendus corrupti assumenda inventore quibusdam, aliquam optio culpa nemo praesentium ab error tenetur! Minima, hic quibusdam?
  Ut nobis similique eos voluptatum ea quas, voluptate dolore unde impedit, ipsum necessitatibus! Praesentium deleniti fugiat natus ipsa ea, accusantium itaque maxime rem corrupti nemo voluptate laborum aliquam, debitis vero!
  Nobis cupiditate hic commodi totam quos quidem doloribus facere maxime impedit veniam dolore repellendus error, nisi qui itaque, quibusdam officiis voluptates provident neque labore quis quia et molestias? Eos, fugit.
  Eaque laudantium neque odio officia possimus officiis autem rem nisi nulla, itaque aliquam tempore atque quo veritatis. Itaque qui dolorem aliquid vero magnam in, ipsum enim ad saepe nam nulla.
  Nesciunt a enim omnis, dicta quibusdam excepturi, ipsam vel expedita aspernatur similique, iusto culpa eum beatae cumque repellat molestias impedit aperiam nulla? Modi tenetur veniam, corrupti nemo in temporibus praesentium.
  Odit vel, dolorem perspiciatis voluptates eveniet provident fuga nam totam eius dolores illo voluptatibus sint iste praesentium nulla recusandae. Pariatur inventore iusto exercitationem, ipsa odit dolores voluptatum in hic veritatis.
  Obcaecati temporibus tenetur dolor? Necessitatibus reprehenderit fugiat similique iusto reiciendis dolore molestiae dolorem quos, rerum maxime quam excepturi ullam, voluptas voluptatibus quibusdam dolores corrupti doloribus sint eius nulla, omnis dignissimos.
  Tempora repellat neque voluptates dignissimos ab aperiam enim dolorem veniam. Sint animi beatae totam eveniet accusantium dolore accusamus voluptas laboriosam, doloribus delectus suscipit excepturi expedita, ipsum similique asperiores dolores hic?
  Saepe debitis ea praesentium enim suscipit ut quaerat? Commodi consequatur voluptas ullam doloribus qui ad possimus labore minima a ut est quaerat assumenda, deserunt culpa unde laborum ducimus amet pariatur!
  Magni ullam cumque nobis vel aut molestiae sint tenetur sed alias modi. Deserunt id odit laudantium, rem aliquid unde eligendi iure aspernatur accusamus excepturi modi, pariatur molestiae temporibus suscipit consequuntur?
  Velit aliquid, maxime quis consectetur in, saepe fuga labore quidem natus, soluta possimus cum eos itaque officia eius sunt voluptatum magnam deserunt? Quos eveniet tempora natus, tempore earum ratione. Quibusdam?
  Aliquam, consectetur, corrupti doloremque pariatur, aut harum cupiditate fuga minima voluptate est doloribus ullam repudiandae omnis obcaecati. Hic sint asperiores dolorum reiciendis ducimus. Dolorum culpa mollitia autem esse, dicta a?
  Neque iste, dolore praesentium maxime, cum, nam inventore ullam iusto quaerat voluptate debitis rem pariatur cupiditate alias aliquam accusamus non aliquid ipsam eveniet quibusdam harum. Consectetur consequatur ad tempora aut!
  Facere in laboriosam dolor nam sed veniam vitae nisi omnis doloremque possimus illum provident repellendus id, quo incidunt excepturi ab aperiam distinctio. Aut dolorum rerum delectus sit quod blanditiis? Culpa.
  Maxime eligendi aut voluptate, nostrum quaerat iste reprehenderit nobis dolores delectus impedit natus ratione provident amet. Iusto mollitia excepturi quas quidem fugiat? Placeat minus laborum, veniam ducimus molestias adipisci voluptate.
  Facere nihil dolorum repellat id perferendis nostrum laborum ratione rerum magni repellendus, unde ipsum eos expedita neque quasi. Reprehenderit totam minus similique tenetur nam! Cumque iure id unde? Mollitia, temporibus?
  Impedit, aliquam dignissimos rerum id tenetur magni, facere cum sapiente architecto deserunt ex iste animi ullam eligendi. Non, illo eius aliquid illum voluptatum inventore, sint eos deserunt dolore dicta delectus!`;

  const [chat, setChat] = useState("");
  const handleChat = (e) => {
    e.preventDefault();
    setChat("");
  };
  return (
    <div className={styles.chatBox}>
      <div className={styles.chatLog}>{chatLog}</div>
      <form onSubmit={handleChat} className={styles.chatInput}>
        <input type="text" value={chat} onChange={(e) => setChat(e.target.value)} />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}
